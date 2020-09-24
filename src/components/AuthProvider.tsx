import {User} from "firebase";
import React, {createContext, ReactNode, useEffect, useState} from "react";
import firebase from "../services/firebase";

export const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        firebase.auth.onAuthStateChanged((user: User | null) => {
            setCurrentUser(user);
            setPending(false);
        });
    }, []);

    if (pending) {
        return <div></div>;
    }

    return (
        <AuthContext.Provider value={currentUser}>
            {props.children}
        </AuthContext.Provider>
    );
};
