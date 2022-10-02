// Requirements
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

// Components
import AvatarButton from "../Main/AvatarButton";

const ChatSection = () => {
    const [inputMessage, setInputMessage] = useState("");

    const handleChatMessage = () => {
        
    }

    return (
        <div className="flex flex-1 flex-column border-2 border-red-500">
            {/* Top wrapper */}
            <div className="flex align-items-center h-5rem border-2 border-green-500">
                <AvatarButton image={`${process.env.PUBLIC_URL}/images/defaultAvatar.png`} shape="circle" size="xlarge" />
                <h4 className="p-0 m-0 ml-2 text-white">Chat with user</h4>
            </div>

            {/* Middle wrapper */}
            <div className="flex flex-1 flex-row align-items-center justify-content-center">

            </div>

            {/* Bottom wrapper */}
            <div className="flex flex-row align-items-center justify-content-center gap-1 h-5rem border-2 border-blue-500 p-2">
                <InputText type="text" className="p-inputtext-md w-full" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                <Button onClick={() => handleChatMessage} label="Send" icon="pi pi-send" iconPos="right" />
            </div>
        </div>
    )
}

export default ChatSection;