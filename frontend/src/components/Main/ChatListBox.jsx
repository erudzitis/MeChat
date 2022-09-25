// Requirements
import React from "react";
import { Avatar } from "primereact/avatar";

const ChatListBox = () => {
    return (
        <div className="flex flex-row h-5rem bg-blue-700 cursor-pointer transition-all transition-duration-500 hover:bg-blue-800">
            {/* Left main wrapper (user avatar) */}
            <div className="flex align-items-center justify-content-center h-full w-5rem">
                <Avatar icon="pi pi-user" className="mr-2" size="large" shape="circle" />
            </div>
            {/* Right main wrapper (user username, last chat time, last chat preview) */}
            <div className="flex flex-1 flex-column justify-content-center h-full">
                <h4 className="p-0 m-0 ml-2 text-white">Dave</h4>
                <h4 className="p-0 m-0 ml-2 text-white font-light">Looking forward to meeting you tommorow...</h4>
            </div>            
        </div>
    )
}

export default ChatListBox;