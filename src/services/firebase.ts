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

    public logout() {
        return this.auth.signOut();
    }

    public getCurrentUsername() {
        console.log(this.auth.currentUser);
        return this.auth.currentUser && this.auth.currentUser.email;
    }

    public isInitialized(): Promise<any> {
        return new Promise((resolve) => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    // async register
}
const firebase = new Firebase();
export default firebase;
