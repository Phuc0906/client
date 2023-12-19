import axios from "axios";
import {
    useContext,
    useState,
    createContext,
    SetStateAction,
    Dispatch,
    ReactNode,
} from "react";
import { useAuth } from "./auth-context";

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
    const [selectedFile, setSelectedFile] = useState<File>();
    const [percentage, setPercentage] = useState<string>("0.0");
    // @ts-ignore
    const { user } = useAuth();

    //functions
    const onFileUploadHandle = () => {
        const formData = new FormData();
        // @ts-ignore
        formData.append("file", selectedFile);
        //TODO:  Upload user File
        axios
            .post(`http://localhost:8080/api/file?uid=${user?.uid}`, formData, {
                onDownloadProgress: (progressEvent) => {
                    const logVal: string =
                        progressEvent.event.target.responseText.split("\n");
                    let i = logVal.length - 1;
                    for (let k = i; k >= 0; k--) {
                        if (logVal[k].includes("data")) {
                            const splittedCounting = logVal[k].split(":");
                            if (splittedCounting.length > 1) {
                                if (
                                    splittedCounting[
                                        splittedCounting.length - 1
                                    ].length > 0
                                ) {
                                    console.log("Has data");
                                    i = k;
                                    break;
                                }
                            }
                        }
                    }
                    console.log(logVal[i]);
                    const percentageData = logVal[i].split(":");
                    const percentageNum: string = parseFloat(
                        percentageData[percentageData.length - 1]
                    ).toFixed(2);
                    setPercentage(percentageNum);
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const value = {
        mode,
        setMode,
        selectedFile,
        setSelectedFile,
        percentage,
        setPercentage,
        onFileUploadHandle,
    };
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
