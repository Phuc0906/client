import React, {useEffect, useState} from "react";

type CheckBoxProps = {
    onClick?: (isSelected: boolean) => void;
    checked?: boolean
}

const CheckBox = ({onClick, checked}: CheckBoxProps) => {
    const [selected, setSelected] = useState<boolean | undefined>((checked) ? checked : false);

    useEffect(() => {
        setSelected(checked);
    }, [checked])

    return <div onClick={() => {
        if (onClick) {
            onClick(!selected);
        }
        setSelected(!selected);
    }} className={`w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center ${selected ? 'bg-blue-500' : ''}`}>
        <div className={`w-2 h-2 rounded-full bg-white`}>

        </div>
    </div>
}

export default CheckBox;
