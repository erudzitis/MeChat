// Requirements
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

// Components
import SearchInput from "../Main/SearchInput";
import ChatListBox from "./Chat/ChatListBox";

const CreateRoomPrimary = ({ setStep }) => {
    const [searchContactsField, setSearchContactsField] = useState("");
    const { contacts } = useSelector(state => state.chat);

    const filteredContacts = useMemo(() => {
        return searchContactsField !== "" ? contacts.filter(contact => contact.username.indexOf(searchContactsField) >= 0) : contacts;
    }, [contacts, searchContactsField]);

    return (
        <div className="flex flex-column align-items-center justify-content-center gap-5 mt-2">
            <SearchInput value={searchContactsField} onChange={(e) => setSearchContactsField(e.target.value)} id="search-contacts" size="sm" placeholder="Search contacts" />

            <div className="flex flex-column">
                <ChatListBox onClick={() => setStep(1)} username={"New Group"} chatPreview={"Click here to create a new group..."} />
            </div>

            <div className="flex flex-column">
                {filteredContacts.map(contact => {
                    return (
                        <ChatListBox id={`contact-${contact.id}`} username={contact.username} chatPreview={""} borderBottom />
                    )
                })}

            </div>
        </div>
    )
}

export default CreateRoomPrimary;