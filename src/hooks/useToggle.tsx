import { useState } from "react";

interface UseToggleResult {
    value: boolean;
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
}

const useToggle = (initialValue: boolean = false): UseToggleResult => {
    const [value, setValue] = useState<boolean>(initialValue);

    const toggle = (): void => {
        setValue((prevValue) => !prevValue);
    };

    const setTrue = (): void => {
        setValue(true);
    };

    const setFalse = (): void => {
        setValue(false);
    };

    return {
        value,
        toggle,
        setTrue,
        setFalse,
    };
};

export default useToggle;
