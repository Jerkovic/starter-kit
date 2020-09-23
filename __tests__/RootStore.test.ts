import {AppStore} from "../src/stores/AppStore";
import {RootStore} from "../src/stores/RootStore";

test("root store can be instantiated", () => {
    const rootStore = new RootStore();
    expect(rootStore.app).toBeInstanceOf(AppStore);
});
