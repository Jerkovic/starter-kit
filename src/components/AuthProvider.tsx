import {User} from "firebase";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import firebase from "../services/firebase";

const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(
            (user: User | null) => {
                setCurrentUser(user);
                setPending(false);
            }
        );
        return () => unsubscribe();
    }, []);

    if (pending) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={currentUser}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
