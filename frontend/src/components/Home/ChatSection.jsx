// Requirements
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";

// Components
import AvatarButton from "../Main/AvatarButton";

// Actions
import { createMessageAction } from "../../actions/chat";

const ChatSection = () => {
    const dispatch = useDispatch();
    const { roomData } = useSelector(state => state.chat);
    const [inputMessage, setInputMessage] = useState("");

    const handleChatMessage = () => {
        const query = {
            roomId: roomData?.roomId,
            content: inputMessage
        }

        dispatch(createMessageAction(query));
    }

    return (
        <div className="flex flex-1 flex-column border-2 border-red-500">
            {/* Top wrapper */}
            <div className="flex align-items-center h-5rem border-2 border-green-500">
                <AvatarButton image={`${process.env.PUBLIC_URL}/images/defaultAvatar.png`} shape="circle" size="xlarge" />
                <h4 className="p-0 m-0 ml-2 text-white">Chat with user</h4>
            </div>

            {/* Middle wrapper */}
            <div className="flex flex-1 flex-column align-items-center justify-content-center">
                {roomData?.messages && roomData.messages.map(message => {
                    return (
                        <h4>{message.content}</h4>
                    )
                })}
            </div>

            {/* Bottom wrapper */}
            <div className="flex flex-row align-items-center justify-content-center gap-1 h-5rem border-2 border-blue-500 p-2">
                <InputText type="text" className="p-inputtext-md w-full" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                <Button onClick={handleChatMessage} label="Send" icon="pi pi-send" iconPos="right" />
            </div>
        </div>
    )
}

export default ChatSection;