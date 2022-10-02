// Requirements
import React from "react";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";

// Components
import InputFloatLabel from "../Main/InputFloatLabel";
import FileUploadCustom from "../Main/FileUploadCustom";

// Actions 
import { createRoomAction } from "../../actions/chat";

const CreateRoomFinalize = ({ formData, setFormData, setSidebarValue }) => {
    const dispatch = useDispatch();

    const handleRoomCreation = () => {
        const query = {
            name: formData.groupName,
            description: formData.groupDescription,
            groupUsers: formData.selectedUsersIndexes,
            isGroupChat: true
        }

        // Dispatching request
        dispatch(createRoomAction(query));
        // Closing down the sidebar
        setSidebarValue(false);
    }

    return (
        <div className="flex flex-column align-items-center justify-content-center gap-5 mt-2">
            <FileUploadCustom />

            <InputFloatLabel
                id="group_name"
                label="Group name"
                onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
            />

            <InputFloatLabel
                id="group_description"
                label="Group description"
                onChange={(e) => setFormData({ ...formData, groupDescription: e.target.value })}
            />

            <Button 
                icon="pi pi-arrow-right" 
                className="p-button-rounded p-button-info fadein animation-duration-250" 
                aria-label="User" 
                onClick={handleRoomCreation}
            />
        </div>
    )
}

export default CreateRoomFinalize;