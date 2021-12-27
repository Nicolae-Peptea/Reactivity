import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../API/Agent";
import { User, UserFormValues } from "../Models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;


    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
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

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
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

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        history.push("/");
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction (() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
}