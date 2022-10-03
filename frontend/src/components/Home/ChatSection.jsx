// Requirements
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

// Components
import AvatarButton from "../Main/AvatarButton";
import ChatMessage from "../Main/ChatMessage";

// Actions
import { createMessageAction } from "../../actions/chat";

const ChatSection = () => {
    const dispatch = useDispatch();
    const { roomData } = useSelector(state => state.chat);
    const [inputMessage, setInputMessage] = useState("");

    // TODO: write a component wrapper that deals with jwt authorization/decoding
    const decodedUser = jwtDecode(localStorage.getItem("chatApplicationToken"));

    const handleChatMessage = () => {
        const query = {
            roomId: roomData?.roomId,
            content: inputMessage
        }

        dispatch(createMessageAction(query));
    }

    return (
        <div className="flex flex-1 flex-column">
            {/* Top wrapper */}
            <div className="flex align-items-center h-5rem">
                <AvatarButton image={`${process.env.PUBLIC_URL}/images/defaultAvatar.png`} shape="circle" size="xlarge" />
                <h4 className="p-0 m-0 ml-2 text-white">Chat with user</h4>
            </div>

            {/* Middle wrapper */}
            <div className="flex flex-1 flex-shrink-0 flex-column gap-2 overflow-y-auto p-1 pl-5 pr-5">
                {roomData?.messages && roomData.messages.map(message => {
                    return (
                        <ChatMessage
                            key={`chat-message-${roomData.roomId}-${message.id}`}
                            content={message.content}
                            timestamp={message.created_at}
                            myMessage={decodedUser.id === message.user_id}
                        />
                    )
                })}
            </div>

            {/* Bottom wrapper */}
            <div className="flex flex-row align-items-center justify-content-center gap-1 h-5rem p-2">
                <InputText type="text" className="p-inputtext-md w-full" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                <Button onClick={handleChatMessage} label="Send" icon="pi pi-send" iconPos="right" />
            </div>
        </div>
    )
}

export default ChatSection;