import {AppStore} from "./AppStore";

export class RootStore {
    public app: AppStore;
    constructor() {
        this.app = new AppStore(this);
    }
}
