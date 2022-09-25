// Requirements
import React from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

const ChatListBox = ({ image, username, onClick, chatPreview, borderBottom }) => {
    return (
        <>
            <div className="flex flex-row flex-shrink-0 p-5 h-5rem bg-blue-700 cursor-pointer transition-all transition-duration-500 hover:bg-blue-800" onClick={onClick}>
                {/* Left main wrapper (user avatar) */}
                <div className="flex align-items-center justify-content-center h-full w-5rem">
                    <Avatar icon="pi pi-user" size="large" shape="circle" />
                </div>
                {/* Right main wrapper (user username, last chat time, last chat preview) */}
                <div className="flex flex-1 flex-column justify-content-center h-full">
                    <h4 className="p-0 m-0 ml-2 text-white">{username}</h4>
                    <h4 className="p-0 m-0 ml-2 text-white font-light">{chatPreview}</h4>
                </div>
            </div>
            {/* Bottom Border */}
            {borderBottom && <div className="border-blue-600 border-bottom-1" />}
        </>

    )
}

export default ChatListBox;