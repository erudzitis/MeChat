// Requirements
import React from "react";
import { Chips } from "primereact/chips";
import { Button } from "primereact/button";

// Components
import SearchInput from "../Main/SearchInput";
import ChatListBox from "../Main/ChatListBox";

const CreateRoomSecondary = ({ setStep, formData, setFormData }) => {

    return (
        <div className="flex flex-column align-items-center justify-content-center gap-5 mt-2">
            <SearchInput id="search-contacts" size="sm" placeholder="Type contact name" />
            <Chips
                placeholder="Selected users..."
                size="sm"
                value={formData.selectedUsers}
                onChange={(e) => setFormData({ ...formData, selectedUsers: e.value }) }
            />

            <div className="flex flex-column">
                <ChatListBox username={"Adelle"} chatPreview={"Hey, I am using chat application!"} borderBottom
                    onClick={() => {
                        formData.selectedUsers.indexOf("Adelle") === -1 && setFormData({ ...formData, selectedUsers: [...formData.selectedUsers, "Adelle"] })
                    }}
                />
                <ChatListBox username={"Ardis"} chatPreview={"Available"} borderBottom />
                <ChatListBox username={"Eduards"} chatPreview={"Business, Money, Cars"} borderBottom />
                <ChatListBox username={"Viliams"} chatPreview={""} borderBottom />
                <ChatListBox username={"Zigismunds"} chatPreview={"Hey, I am using chat application!"} borderBottom />
                <ChatListBox username={"Zigvards"} chatPreview={":)"} borderBottom />
                <ChatListBox username={"Zanda"} chatPreview={"Hello!"} borderBottom />
            </div>

            {formData.selectedUsers.length && <Button icon="pi pi-arrow-right" className="p-button-rounded p-button-info absolute bottom-0 mb-1 fadein animation-duration-250" aria-label="User" onClick={() => setStep(2)} />}
        </div>
    )
}

export default CreateRoomSecondary;