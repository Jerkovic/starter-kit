import {observable} from "mobx";
import {BaseStore} from "./BaseStore";
import {RootStore} from "./RootStore";

export class AppStore extends BaseStore {
    @observable public isHidden: boolean = false;
    constructor(rootStore: RootStore) {
        super(rootStore);
    }
}
