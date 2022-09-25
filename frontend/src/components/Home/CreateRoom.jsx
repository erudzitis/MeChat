// Requirements
import React, { useState } from "react";

// Components
import CreateRoomPrimary from "./CreateRoomPrimary";
import CreateRoomSecondary from "./CreateRoomSecondary";

const CreateRoom = () => {
    const [componentStep, setComponentStep] = useState(0);

    const componentList = [
        <CreateRoomPrimary setStep={setComponentStep} />,
        <CreateRoomSecondary setStep={setComponentStep} />
    ]    

    return (
        <div>
            { componentList[componentStep] }
        </div>
    )
}

export default CreateRoom;