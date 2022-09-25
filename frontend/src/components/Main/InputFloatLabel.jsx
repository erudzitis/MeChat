// Requirements
import React from "react";
import { InputText } from "primereact/inputtext";

const InputFloatLabel = ({ id, label, size, value, onChange, inputRef }) => {
    // Option to not render with wrapping floating label
    if (!label) {
        return (
            <InputText id={id} type="text" className={`w-full p-inputtext-${size}`} inputRef={inputRef} value={value} onChange={onChange} />
        )
    }

    return (
        <span className="p-float-label">
            <InputText id={id} type="text" className={`w-full p-inputtext-${size}`} inputRef={inputRef} value={value} onChange={onChange} />
            <label htmlFor={id}>{label}</label>
        </span>
    )
}

export default InputFloatLabel;