import axios from "axios";
import {
    useContext,
    useState,
    createContext,
    SetStateAction,
    Dispatch,
    ReactNode,
    useEffect, useMemo,
} from "react";
import { useAuth } from "./auth-context";
import { base64ToFile, downloadFile } from "../utils/utils";
import {set} from "react-hook-form";
import {collection, doc as firestoreDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "../firebase/firebase-config";
import useFirestore, {Condition} from "../hooks/useFiresStore";

export type ModeContextPropsType = {
    mode: boolean,
    setMode: Dispatch<SetStateAction<boolean>>;
    selectedFile?: File;
    setSelectedFile: Dispatch<SetStateAction<File | undefined>>;
    percentage: string;
    setPercentage: Dispatch<SetStateAction<string>>;
    onFileUploadHandle: () => void;
    appearance: string;
    setAppearance: Dispatch<SetStateAction<string>>;
    slidingWidth: number;
    userFiles: FileProps[];
    userText: string;
    setUserText: Dispatch<SetStateAction<string>>;
    downloadRequest: boolean;
    setDownloadRequest: Dispatch<SetStateAction<boolean>>;
    outputText: string | undefined;
    handleFixUserText: () => void;
    startDownload: boolean;
    setStartDownload: Dispatch<SetStateAction<boolean>>;
    documentId: string;
    setDocumentId: Dispatch<SetStateAction<string>>;
    handleDownloadFile: () => void;
    downloadFileName: string;
    setDownloadFileName: Dispatch<SetStateAction<string>>;
    doneProcess: boolean;
    setDoneProcess: Dispatch<SetStateAction<boolean>>;
    isValidSubscription: boolean;
    premiumRequest: boolean;
    setPremiumRequest: Dispatch<SetStateAction<boolean>>;
    deleteRequest: boolean;
    setDeleteRequest: Dispatch<SetStateAction<boolean>>;
    handleDeleteFile: () => void;

};

interface ModeProviderProps {
    children: ReactNode;
}

export type FileProps = {
    document_id: string;
    fileName: string;
    userId: string;
    dateUpload: string;
};

const ModeContext = createContext<ModeContextPropsType | undefined>(undefined);

function ModeProvider(props: ModeProviderProps) {
    //false: text mode
    //true : file mode
    const [mode, setMode] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [percentage, setPercentage] = useState<string>("0.0");
    const [appearance, setAppearance] = useState<string>("light");
    const [documentId, setDocumentId] = useState<string>("");
    const [slidingWidth, setSlidingWidth] = useState<number>(0);
    const [userText, setUserText] = useState<string>("");
    const [downloadRequest, setDownloadRequest] = useState(false);
    const [outputText, setOutputText] = useState<string | undefined>("");
    const [deleteRequest, setDeleteRequest] = useState(false);
    const [outputText, setOutputText] = useState<string | undefined>('');
    const [startDownload, setStartDownload] = useState(false);
    const [downloadFileName, setDownloadFileName] = useState("document.docx");
    const [doneProcess, setDoneProcess] = useState(false);
    const { user } = useAuth();
    const [userFiles, setUserFiles] = useState<FileProps[]>([]);
    const [isValidSubscription, setIsValidSubscription] = useState(false);
    const [premiumRequest, setPremiumRequest] = useState(false);

    const condition = useMemo<Condition>(() => {
        return {
            fieldName: "uid",
            operator: "==",
            compareValue: user?.uid,
        };
    }, [user]);

    const currentUser = useFirestore("users", condition);

    useEffect(() => {
        if (currentUser !== null) {

            if (currentUser.length > 0) {
                console.log(currentUser);
                // TODO: Replace this with expired date
                if (parseInt(currentUser[0].activate) !== -1) {
                    console.log("Valid")
                    setIsValidSubscription(true);
                }else {
                    console.log("Invalid")
                    setIsValidSubscription(false);
                }
            }
        }
    }, [currentUser])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/file?uid=${user?.uid}`)
            .then((res) => {
                console.log(res.data);
                setUserFiles(res.data);
            })
            .catch((err) => {});
    }, [user, downloadRequest, deleteRequest])

    //functions
    const onFileUploadHandle = () => {
        const formData = new FormData();
        // @ts-ignore
        formData.append("file", selectedFile);
        setStartDownload(true);
        setDoneProcess(false);
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
                    const percentageData = logVal[i].split(":");
                    const percentageDatasplited =
                        percentageData[percentageData.length - 1].split("+");
                    const percentageNum: string = parseFloat(
                        percentageDatasplited[0]
                    ).toFixed(2);
                    const slidingWidthOnPercentage = parseInt(
                        String((parseFloat(percentageNum) / 100.0) * 450)
                    );
                    setDocumentId(
                        percentageDatasplited[percentageDatasplited.length - 1]
                    );
                    console.log(
                        percentageDatasplited[percentageDatasplited.length - 1]
                    );
                    setPercentage(percentageNum);
                    setSlidingWidth(slidingWidthOnPercentage);
                },
            })
            .then((res) => {
                console.log(res);
                setSlidingWidth(450);
                setPercentage("100");
                setDoneProcess(true);
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
                downloadFile(
                    base64ToFile(res.data, "", ""),
                    `${downloadFileName}`
                );
                setDownloadRequest(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteFile = () => {
        axios
            .delete(
                `${process.env.REACT_APP_API_URL}/api/file/delete-file?file=${documentId}`
            )
            .then((res) => {
                console.log("Delete success")
                setDeleteRequest(false);

            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        console.log("Change " + documentId);
    }, [documentId]);

    const handleFixUserText = () => {
        axios
            .post(`http://localhost:8080/api/file/paragraph`, {
                paragraph: userText,
            })
            .then((res) => {
                console.log(res);
                setOutputText(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const value: ModeContextPropsType = {
        mode: mode,
        setMode: setMode,
        selectedFile: selectedFile,
        setSelectedFile: setSelectedFile,
        percentage: percentage,
        setPercentage: setPercentage,
        onFileUploadHandle: onFileUploadHandle,
        appearance: appearance,
        setAppearance: setAppearance,
        slidingWidth: slidingWidth,
        userFiles: userFiles,
        userText: userText,
        setUserText: setUserText,
        downloadRequest: downloadRequest,
        setDownloadRequest: setDownloadRequest,
        outputText: outputText,
        handleFixUserText: handleFixUserText,
        startDownload: startDownload,
        setStartDownload: setStartDownload,
        documentId: documentId,
        setDocumentId: setDocumentId,
        handleDownloadFile: handleDownloadFile,
        downloadFileName: downloadFileName,
        setDownloadFileName: setDownloadFileName,
        doneProcess: doneProcess,
        setDoneProcess: setDoneProcess,
        isValidSubscription: isValidSubscription,
        premiumRequest: premiumRequest,
        setPremiumRequest: setPremiumRequest,
        deleteRequest: deleteRequest,
        setDeleteRequest: setDeleteRequest,
        handleDeleteFile: handleDeleteFile

    };
    return (
        <ModeContext.Provider {...props} value={value}></ModeContext.Provider>
    );
}

function useMode() {
    const context = useContext(ModeContext);
    if (typeof context === "undefined") {
        throw new Error("useMode must be used within ModeProvider");
    }
    return context;
}

export { useMode, ModeProvider };
