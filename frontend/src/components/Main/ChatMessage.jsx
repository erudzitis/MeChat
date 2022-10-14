// Requirements
import React from "react";

const ChatMessage = ({ content, myMessage, timestamp }) => {
    return (
        <div className={`flex justify-content-${myMessage ? "end" : "start"}`}>
            <div className={`flex align-items-center w-max border-round-3xl pl-2 pr-2 ${myMessage ? "bg-primary" : "surface-ground"}`}>
                <h4 className="p-0 font-normal">{content}</h4>
            </div>
        </div>
    )
}

export default ChatMessage;