import {
    useContext,
    useState,
    createContext,
    SetStateAction,
    Dispatch,
    ReactNode,
} from "react";

type ModeContextPropsType = {
    mode: boolean;
    setMode: Dispatch<SetStateAction<boolean>>;
};

interface ModeProviderProps {
    children: ReactNode;
}

const ModeContext = createContext<ModeContextPropsType | null>(null);

function ModeProvider(props: ModeProviderProps) {
    //false: text mode
    //true : file mode
    const [mode, setMode] = useState<boolean>(false);
    const value = { mode, setMode };
    return (
        <ModeContext.Provider {...props} value={value}></ModeContext.Provider>
    );
}

function useMode() {
    const context = useContext(ModeContext);
    if (typeof context === "undefined") {
        throw new Error("useMode must be used within AuthProvider");
    }
    return context;
}

export { useMode, ModeProvider };
