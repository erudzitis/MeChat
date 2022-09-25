// Requirements
import React from "react";
import { InputText } from "primereact/inputtext";

const SearchInput = ({ id, placeholder, size }) => {
    return (
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText id={id} type="text" className={`w-full p-inputtext-${size}`} placeholder={placeholder} />
        </span>
    )
}

export default SearchInput;