import { makeAutoObservable } from "mobx";
import agent from "../API/Agent";
import { User, UserFormValues } from "../Models/user";

export default class UserStore {
    user: User | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            console.log(user);
        } catch (error) {
            throw error;
        }
    }
}