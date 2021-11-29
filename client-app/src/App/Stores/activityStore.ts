import {makeObservable, observable} from "mobx"


export default class ActivityStore{
    title = "Hello form MobX";

    constructor() {
        makeObservable(this, {
            title: observable
        })
        
    }
}