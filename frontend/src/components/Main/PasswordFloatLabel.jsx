// Requirements
import React from "react";
import { Password } from "primereact/password";

const PasswordFloatLabel = ({ id, label, size }) => {
    return (
        <span className="p-float-label">
            <Password id={id} type="password" className={`w-full p-inputtext-${size}`} inputStyle={{ width: "100%" }} toggleMask feedback={false} />
            <label htmlFor={id}>{label}</label>
        </span>
    )
}

export default PasswordFloatLabel;