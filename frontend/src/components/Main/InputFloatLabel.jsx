// Requirements
import React from "react";
import { InputText } from "primereact/inputtext";

const InputFloatLabel = ({ id, label, size }) => {
    return (
        <span className="p-float-label">
            <InputText id={id} type="text" className={`w-full p-inputtext-${size}`} />
            <label htmlFor={id}>{label}</label>
        </span>
    )
}

export default InputFloatLabel;