// Requirements
import React from "react";
import { Password } from "primereact/password";

const PasswordFloatLabel = ({ id, label, size, value, onChange, inputRef, invalid }) => {
    // Option to not render with wrapping floating label
    if (!label) {
        return (
            <>
                <Password id={id} type="password" className={`w-full p-inputtext-${size} ${invalid && "p-invalid"}`} inputStyle={{ width: "100%" }} inputRef={inputRef} value={value} onChange={onChange} toggleMask feedback={false} />
            </>
        )
    }

    return (
        <span className="p-float-label">
            <Password id={id} type="password" className={`w-full p-inputtext-${size} ${invalid && "p-invalid"}`} inputStyle={{ width: "100%" }} inputRef={inputRef} value={value} onChange={onChange} toggleMask feedback={false} />
            <label htmlFor={id}>{label}</label>
        </span>
    )
}

export default PasswordFloatLabel;