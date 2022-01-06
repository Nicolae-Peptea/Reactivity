import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/Agent";
import { Profile } from "../Models/profile";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;

        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
            })
        } catch (error) {
            console.log(error) 
        } finally {
            runInAction(() => this.loadingProfile = false)
        }
    }
}