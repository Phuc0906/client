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

export type AuthContextPropsType = {
    user: User | null;
};

const AuthContext = createContext<AuthContextPropsType | null>(null);

function AuthProvider({ children }: AuthContextProps) {
    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserInfo(user);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user: userInfo }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (typeof context === "undefined") {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth, AuthContext };
