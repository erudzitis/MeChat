// Requirements
import React from "react";
import { Avatar } from "primereact/avatar";
import { S3_BUCKET_URL } from "../../../constants";

const ChatListBox = ({ image, username, onClick, chatPreview, borderBottom, isActive }) => {
    console.log(S3_BUCKET_URL)

    return (
        <>
            <div className={`w-full flex flex-row flex-shrink-0 p-2 h-auto ${isActive ? "surface-card" : ""} cursor-pointer transition-all transition-duration-500 hover:surface-card border-round`} onClick={onClick}>
                {/* Left main wrapper (user avatar) */}
                <div className="flex align-items-center justify-content-center h-full w-5rem">
                    <Avatar
                        image={image ? `${S3_BUCKET_URL}/${image}` : `${process.env.PUBLIC_URL}/images/defaultAvatar.png`}
                        size="large"
                        shape="circle"
                    />
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