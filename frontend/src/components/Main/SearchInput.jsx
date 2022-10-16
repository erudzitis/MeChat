// Requirements
import React from "react";
import { InputText } from "primereact/inputtext";

const SearchInput = ({ id, placeholder, size, value, onChange }) => {
    return (
        <span className="p-input-icon-left w-full">
            <i className="pi pi-search" />
            <InputText 
                id={id} 
                type="text" 
                className={`w-full p-inputtext-${size}`} 
                value={value}
                placeholder={placeholder} 
                onChange={onChange}
            />
        </span>
    )
}

export default SearchInput;