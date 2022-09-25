// Requirements
import React from "react";

// Components
import SearchInput from "../Main/SearchInput";
import ChatListBox from "../Main/ChatListBox";

const CreateRoomPrimary = ({ setStep }) => {
    return (
        <div className="flex flex-column align-items-center justify-content-center gap-5 mt-2">
            <SearchInput id="search-contacts" size="sm" placeholder="Search contacts" />

            <div className="flex flex-column">
                <ChatListBox onClick={() => setStep(1)} username={"New Group"} chatPreview={"Click here to create a new group..."} />
            </div>

            <div className="flex flex-column">
                <ChatListBox username={"Adelle"} chatPreview={"Hey, I am using chat application!"} borderBottom />
                <ChatListBox username={"Ardis"} chatPreview={"Available"} borderBottom />
                <ChatListBox username={"Eduards"} chatPreview={"Business, Money, Cars"} borderBottom />
                <ChatListBox username={"Viliams"} chatPreview={""} borderBottom />
                <ChatListBox username={"Zigismunds"} chatPreview={"Hey, I am using chat application!"} borderBottom />
                <ChatListBox username={"Zigvards"} chatPreview={":)"} borderBottom />
            </div>
        </div>
    )
}

export default CreateRoomPrimary;