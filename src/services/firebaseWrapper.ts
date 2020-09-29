import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {};

class Firebase {
    public auth: app.auth.Auth;
    public db: app.firestore.Firestore;
    public storage: app.storage.Storage;

    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    public login(email: string, password: string) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    public async getUserProfile(): Promise<app.firestore.DocumentReference> {
        const user = await this.auth.currentUser;
        if (user) {
            return this.db.doc(`/user/${user.uid}`);
        } else {
            return Promise.reject("Could not load profile");
        }
    }

    public isAuthenticated(): boolean {
        return this.auth.currentUser !== null;
    }

    public logout() {
        return this.auth.signOut();
    }

    public isInitialized(): Promise<any> {
        return new Promise((resolve) => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    // async register
}
const firebaseWrapper = new Firebase();
export default firebaseWrapper;
