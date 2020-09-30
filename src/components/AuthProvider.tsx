import * as firebase from "firebase/app";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import firebaseWrapper from "../services/firebaseWrapper";

export interface AuthContextValue {
    currentUser: firebase.User | null;
    userDetails: UserDetails | null;
}

export interface UserDetails {
    logins: number;
}
const AuthContext = createContext<AuthContextValue>({
    currentUser: null,
    userDetails: null
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const unsubscribe = firebaseWrapper.auth.onAuthStateChanged(
            (user: firebase.User | null) => {
                setCurrentUser(firebaseWrapper.auth.currentUser);
                if (user) {
                    firebaseWrapper
                        .getUserProfile()
                        .then((d: firebase.firestore.DocumentSnapshot<any>) => {
                            setUserDetails({logins: d.data().logins});
                        });
                } else {
                    setUserDetails(null);
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
