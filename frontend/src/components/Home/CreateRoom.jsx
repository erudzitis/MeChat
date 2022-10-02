// Requirements
import React, { useState } from "react";

// Components
import CreateRoomPrimary from "./CreateRoomPrimary";
import CreateRoomSecondary from "./CreateRoomSecondary";
import CreateRoomFinalize from "./CreateRoomFinalize";

const CreateRoom = ({ setSidebarValue }) => {
    const [componentStep, setComponentStep] = useState(0);
    const [componentFormData, setComponentFormData] = useState({
        selectedUsers: [],
        selectedUsersIndexes: [],
        groupName: "",
        groupDescription: ""
    });

    const componentList = [
        <CreateRoomPrimary setStep={setComponentStep} />,
        <CreateRoomSecondary setStep={setComponentStep} formData={componentFormData} setFormData={setComponentFormData} />,
        <CreateRoomFinalize formData={componentFormData} setFormData={setComponentFormData} setSidebarValue={setSidebarValue} />
    ]    

    return (
        <div>
            { componentList[componentStep] }
        </div>
    )
}

export default CreateRoom;