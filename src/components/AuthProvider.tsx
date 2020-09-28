import {User} from "firebase";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import firebaseWrapper from "../services/firebaseWrapper";

const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const unsubscribe = firebaseWrapper.auth.onAuthStateChanged(
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
