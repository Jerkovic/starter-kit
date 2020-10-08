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

    public async getBearerToken(): Promise<string> {
        if (this.auth.currentUser) {
            return await this.auth.currentUser.getIdToken();
        } else {
            return Promise.reject("Could not fetch bearer token");
        }
    }

    public isAuthenticated(): boolean {
        return this.auth.currentUser !== null;
    }

    public async logout() {
        return await this.auth.signOut();
    }

    public isInitialized(): Promise<any> {
        return new Promise((resolve) => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    public async register(email: string, password: string) {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    public async sendPasswordResetEmail(email: string) {
        return this.auth.sendPasswordResetEmail(email);
    }
}
const firebaseWrapper = new Firebase();
export default firebaseWrapper;
