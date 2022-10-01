// Requirements 
import React from "react";
import { FileUpload } from "primereact/fileupload";

const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;

    return (
        <div className={className} style={{ backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {chooseButton}
            {uploadButton}
            {cancelButton}
        </div>
    );
}

const emptyTemplate = () => {
    return (
        <div className="flex align-items-center flex-column h-6rem">
            <i className="pi pi-image" style={{ "fontSize": "3em", borderRadius: "5px", backgroundColor: "var(--surface-b)", color: "var(--surface-d)" }}></i>
            <span style={{ "fontSize": "1em", color: "var(--gray-400)", marginTop: "-2px" }} className="my-5">Drag and drop your image here</span>
        </div>
    )
}

const chooseOptions = { icon: "pi pi-fw pi-images", iconOnly: true, className: "custom-choose-btn sm" };
const uploadOptions = { icon: "pi pi-fw pi-cloud-upload", iconOnly: true, className: "custom-upload-btn p-button-success sm" };
const cancelOptions = { icon: "pi pi-fw pi-times", iconOnly: true, className: "custom-cancel-btn p-button-danger" };

const FileUploadCustom = () => {
    const handleFileUpload = () => {

    }

    return (
        <FileUpload
            accept="image/*"
            customUpload
            uploadHandler={handleFileUpload}
            emptyTemplate={emptyTemplate}
            headerTemplate={headerTemplate}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
        />
    )
}

export default FileUploadCustom;