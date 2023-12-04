import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

interface AuthContextProps {
    children: ReactNode;
}

const AuthContext = createContext<
    | [User | undefined, React.Dispatch<React.SetStateAction<User | undefined>>]
    | undefined
>(undefined);

function AuthProvider({ children }: AuthContextProps) {
    const [userInfo, setUserInfo] = useState<User | undefined>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserInfo(user);
            }
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);

    const value: [
        User | undefined,
        React.Dispatch<React.SetStateAction<User | undefined>>
    ] = [userInfo, setUserInfo];

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (typeof context === "undefined") {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };
