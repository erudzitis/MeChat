// Requirements
import React from "react";
import { SpeedDial } from "primereact/speeddial";

// Components
import SearchInput from "../Main/SearchInput";
import AvatarButton from "../Main/AvatarButton";
import ChatListBox from "../Main/ChatListBox";

const items = [
    {
        label: "Add Friend",
        icon: "pi pi-user-plus",
    }
];

const Home = () => {
    return (
        <div className="flex flex-row align-items-center justify-content-center bg-blue-600 overflow-hidden" style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
            {/* Left main wrapper */}
            <div className="flex flex-column h-full w-3 bg-blue-700">
                {/* Upper section (search bar) */}
                <div className="flex align-items-center justify-content-center border-blue-600 border-bottom-2 h-5rem">
                    <SearchInput id="search-user" size="sm" placeholder="Search" />
                </div>
                {/* Middle section (chat list) */}
                <div className="flex flex-1 flex-column border-blue-600 border-bottom-2">
                    <ChatListBox />
                    {/* Bottom Border */}
                    <div className="border-blue-600 border-bottom-1" />
                </div>
                {/* Lower section (control bar) */}
                <div className="flex align-items-center justify-content-between h-5rem">
                    <div className="flex align-items-center justify-content-center h-full w-3">
                        <AvatarButton image={`${process.env.PUBLIC_URL}/images/defaultAvatar.png`} shape="circle" size="xlarge" />
                    </div>
                    <div className="flex flex-1 align-items-center justify-content-end h-full">
                        <SpeedDial className="mr-2" model={items} direction="left" />
                    </div>
                </div>
            </div>
            {/* Right main wrapper */}
            <div className="flex flex-1 h-full">

            </div>
        </div>
    )
}

export default Home;