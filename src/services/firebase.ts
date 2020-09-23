import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {};

//export const db = app.firestore();

class Firebase {
    public auth: app.auth.Auth;
    public db: app.firestore.Firestore;

    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        console.log(this.auth.currentUser);
    }

    login(email: string, password: string) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut();
    }

    getCurrentUsername() {
        console.log(this.auth.currentUser);
        return this.auth.currentUser && this.auth.currentUser.email;
    }

    isInitialized(): Promise<any> {
        return new Promise((resolve) => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    // async register
}
const firebase = new Firebase();
export default firebase;
