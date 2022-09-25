// Requirements
import React from "react";
import { Avatar } from "primereact/avatar";

const ChatListBox = ({ image, username, chatPreview }) => {
    return (
        <>
            <div className="flex flex-row flex-shrink-0 h-5rem bg-blue-700 cursor-pointer transition-all transition-duration-500 hover:bg-blue-800">
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
            <div className="border-blue-600 border-bottom-1" />
        </>

    )
}

export default ChatListBox;