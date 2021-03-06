import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../API/Agent";
import { User, UserFormValues } from "../Models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;
    fbAccessToken: fb.AuthResponse | null = null;
    fbLoading = false;
    refreshTokenTimeout: any;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    register = async (creds: UserFormValues) => {
        try {
            await agent.Account.register(creds);
            history.push(`/account/registerSuccess?email=${creds.email}`);
            store.modalStore.closeModal();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => {
                this.user = user;
            })
           history.push("/activities");
           store.modalStore.closeModal();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getFacebookLoginStatus = async () => {
        window.FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                this.fbAccessToken = response.authResponse;
            }
        })
    }

    facebookLogin = () => {
        this.fbLoading = true;
        const apiLogin = (authResponse: fb.AuthResponse) => {

            if (authResponse === null) {
                runInAction(() => this.fbLoading = false)
                return;
            }
            
            agent.Account.fbLogin(authResponse.accessToken).then(user => {
                store.commonStore.setToken(user.token);
                this.startRefreshTokenTimer(user);
                runInAction(() => {
                    this.user = user;
                    this.fbLoading = false;
                })
                history.push('/activities')
            }).catch(error => {
                console.log(error);
                runInAction(() => this.fbLoading = false);
            })
        }

        if (this.fbAccessToken) {
            apiLogin(this.fbAccessToken);
        } else {
            window.FB.login(response => {
                apiLogin(response.authResponse);
            }, {scope: 'public_profile,email'})
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        history.push("/");
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            store.commonStore.setToken(user.token);
            runInAction (() => this.user = user);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    setImage = (image: string) => {
        if (this.user) {
            this.user.image = image;
        }
    }

    setDisplayName = (name: string) => {
        if (this.user) {
            this.user.displayName = name;
        }
    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (30 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}