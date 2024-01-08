import axios from "axios";
import {
    useContext,
    useState,
    createContext,
    SetStateAction,
    Dispatch,
    ReactNode, useEffect,
} from "react";
import { useAuth } from "./auth-context";
import {base64ToFile, downloadFile} from "../utils/utils";

type ModeContextPropsType = {
    mode: boolean;
    setMode: Dispatch<SetStateAction<boolean>>;
};

interface ModeProviderProps {
    children: ReactNode;
}

export type FileProps = {
    document_id: string,
    fileName: string,
    userId: string,
    dateUpload: string
}

const ModeContext = createContext<ModeContextPropsType | null>(null);

function ModeProvider(props: ModeProviderProps) {
    //false: text mode
    //true : file mode
    const [mode, setMode] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [percentage, setPercentage] = useState<string>("0.0");
    const [appearance, setAppearance] = useState<string>("light");
    const [documentId, setDocumentId] = useState<string>('');
    const [slidingWidth, setSlidingWidth] = useState<number>(0);
    const [userText, setUserText] = useState<string>('');
    const [downloadRequest, setDownloadRequest] = useState(false);
    // @ts-ignore
    const { user } = useAuth();

    const [userFiles, setUserFiles] = useState<FileProps[]>([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/file?uid=${user?.uid}`).then(res => {
            console.log(res.data);
            setUserFiles(res.data);
        }).catch(err => {

        })
    }, [user])

    //functions
    const onFileUploadHandle = () => {
        const formData = new FormData();
        // @ts-ignore
        formData.append("file", selectedFile);
        //TODO:  Upload user File
        axios.post(`http://localhost:8080/api/file?uid=${user?.uid}`, formData, {
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
                    const percentageData = logVal[i].split(":");
                    const percentageDatasplited =  percentageData[percentageData.length - 1].split("+");
                    const percentageNum: string = parseFloat(
                        percentageDatasplited[0]
                    ).toFixed(2);
                    const slidingWidthOnPercentage = parseInt(String(((parseFloat(percentageNum) / 100.0) * 450)))
                    setDocumentId(percentageDatasplited[percentageDatasplited.length - 1]);
                    setPercentage(percentageNum);
                    setSlidingWidth(slidingWidthOnPercentage)
                },
            })
            .then((res) => {
                console.log(res);
                setSlidingWidth(450);
                setPercentage('100');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDownloadFile = () => {
        //TODO: download by file id
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/file/single-file?file_id=${documentId}`
            )
            .then((res) => {
                console.log(res.data);
                downloadFile(base64ToFile(res.data, "", ""), "test.docx");
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
        appearance,
        setAppearance,
        slidingWidth,
        userFiles,
        userText,
        setUserText,
        downloadRequest,
        setDownloadRequest
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
