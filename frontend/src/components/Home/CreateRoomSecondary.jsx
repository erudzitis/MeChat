// Requirements
import React, { useState } from "react";
import { Chips } from "primereact/chips";
import { Button } from "primereact/button";

// Components
import SearchInput from "../Main/SearchInput";
import ChatListBox from "../Main/ChatListBox";

const CreateRoomSecondary = ({ setStep }) => {
    const [chipValues, setChipValues] = useState([]);

    return (
        <div className="flex flex-column align-items-center justify-content-center gap-5 mt-2">
            <SearchInput id="search-contacts" size="sm" placeholder="Type contact name" />
            <Chips
                placeholder="Selected users..."
                size="sm"
                value={chipValues}
                onChange={(e) => setChipValues(e.value) }
                onAdd={(value) => console.log("Added value: ", value)}
                onRemove={(value) => console.log("Removed value: ", value)}
            />

            <div className="flex flex-column">
                <ChatListBox username={"Adelle"} chatPreview={"Hey, I am using chat application!"} borderBottom
                    onClick={() => {
                        chipValues.indexOf("Adelle") == -1 && setChipValues([...chipValues, "Adelle"])
                    }}
                />
                <ChatListBox username={"Ardis"} chatPreview={"Available"} borderBottom />
                <ChatListBox username={"Eduards"} chatPreview={"Business, Money, Cars"} borderBottom />
                <ChatListBox username={"Viliams"} chatPreview={""} borderBottom />
                <ChatListBox username={"Zigismunds"} chatPreview={"Hey, I am using chat application!"} borderBottom />
                <ChatListBox username={"Zigvards"} chatPreview={":)"} borderBottom />
            </div>

            <Button icon="pi pi-arrow-right" className="p-button-rounded p-button-info" aria-label="User" onClick={() => setStep(3)} />
        </div>
    )
}

export default CreateRoomSecondary;