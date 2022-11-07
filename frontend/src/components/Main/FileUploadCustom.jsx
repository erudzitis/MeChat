// Requirements 
import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";

// Components
import Flex from "../Custom/Flex";

const headerTemplate = (options) => {
    const { className, chooseButton, cancelButton } = options;

    return (
        <Flex className={className} justify="center" align="center" style={{ backgroundColor: "transparent", borderRadius: "rounded" }}>
            {chooseButton}
            {cancelButton}
        </Flex>
    );
}

const emptyTemplate = () => {
    return (
        <Flex direction="column" align="center" justify="center" gap={2}>
            <i className="pi pi-image text-gray-500 text-6xl" />
            <span className="text-gray-500">Drag and drop your image here</span>
        </Flex>
    )
}

const itemTemplate = (file) => {
    return (
        <Flex className="h-8rem p-0" align="center" justify="center">
            <img className="max-h-full max-w-full" src={file.objectURL} />
        </Flex>
    )
}

const chooseOptions = { icon: "pi pi-fw pi-images", iconOnly: true, className: "custom-choose-btn sm p-button-rounded" };
const cancelOptions = { icon: "pi pi-fw pi-times", iconOnly: true, className: "custom-cancel-btn p-button-danger p-button-rounded" };

const FileUploadCustom = ({ setSelectedFile }) => {
    const fileUploadRef = useRef(null);

    const handleFileSelect = (e) => {
        setSelectedFile(e.files[0]);
    }

    return (
        <FileUpload
            accept="image/*"
            customUpload
            onSelect={handleFileSelect}
            emptyTemplate={emptyTemplate}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            chooseOptions={chooseOptions}
            cancelOptions={cancelOptions}
            ref={fileUploadRef}
        />
    )
}

export default FileUploadCustom;