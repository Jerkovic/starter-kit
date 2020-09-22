import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: ""
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
