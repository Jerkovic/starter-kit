import * as firebase from "firebase/app";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import firebaseWrapper from "../services/firebaseWrapper";

interface AuthContextValue {
    currentUser: firebase.User | null;
    userDetails: string;
}
const AuthContext = createContext<AuthContextValue>({
    currentUser: null,
    userDetails: ""
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [userDetails, setUserDetails] = useState("John Doe");
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const unsubscribe = firebaseWrapper.auth.onAuthStateChanged(
            (user: firebase.User | null) => {
                setCurrentUser(firebaseWrapper.auth.currentUser);
                if (user) {
                    user.providerData.forEach((profile) => {
                        if (profile) {
                            console.log("  Provider: " + profile.providerId);
                            console.log("  UID: " + profile.uid);
                            console.log("  Name: " + profile.displayName);
                            console.log("  Email: " + profile.email);
                            console.log("  Photo URL: " + profile.photoURL);
                        }
                    });
                }
                setPending(false);
            }
        );
        return () => unsubscribe();
    }, []);

    if (pending) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{currentUser, userDetails}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
