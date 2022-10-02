// Requirements
import React, { useState, useMemo } from "react";
import { Chips } from "primereact/chips";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";

// Components
import SearchInput from "../Main/SearchInput";
import ChatListBox from "../Main/ChatListBox";

const CreateRoomSecondary = ({ setStep, formData, setFormData }) => {
    const [searchContactsField, setSearchContactsField] = useState("");
    const { contacts } = useSelector(state => state.chat);

    const filteredContacts = useMemo(() => {
        return searchContactsField !== "" ? contacts.filter(contact => contact.username.indexOf(searchContactsField) >= 0) : contacts;
    }, [contacts, searchContactsField]);

    console.log(formData);

    // Function to add/remove users from the chip by click
    const handleChatListBoxAddValue = (eventValue) => {
        // on add event, single string of added chip value is passed, otherwise we retrieve a remaining list
        const isAddEvent = typeof (eventValue) === "string";

        if (isAddEvent) {
            const username = eventValue;

            // Checking whether valid contact username was entered in the field
            const contactInstance = contacts.find(contact => contact.username === username);

            // No such contact exists
            if (!contactInstance) {
                return;
            }

            // Checking whether chip values already contain the given contact
            const contactChipExists = formData.selectedUsers.indexOf(username) >= 0;

            contactChipExists
                ? setFormData({ ...formData, selectedUsers: formData.selectedUsers.filter(su => su !== username), selectedUsersIndexes: formData.selectedUsersIndexes.filter(su => su !== contactInstance.id) })
                : setFormData({ ...formData, selectedUsers: [...formData.selectedUsers, username], selectedUsersIndexes: [...formData.selectedUsersIndexes, contactInstance.id] });
        } else {
            const remainingChipValues = eventValue.value;

            // No values remain
            if (!remainingChipValues.length) {
                setFormData({ ...formData, selectedUsers: [], selectedUsersIndexes: [] });
                return;
            }

            // There are remaining values, we need to figure out which one was removed...
            const removedChipValue = formData.selectedUsers.filter(su => !remainingChipValues.includes(su))[0];

            // Retrieving contact instance
            const contactInstance = contacts.find(contact => contact.username === removedChipValue);

            setFormData({ ...formData, selectedUsers: formData.selectedUsers.filter(su => su !== removedChipValue), selectedUsersIndexes: formData.selectedUsersIndexes.filter(su => su !== contactInstance.id) })
        }

    }

    return (
        <div className="flex flex-column align-items-center justify-content-center gap-5 mt-2">
            <SearchInput value={searchContactsField} onChange={(e) => setSearchContactsField(e.target.value)} id="search-contacts" size="sm" placeholder="Type contact name" />
            <Chips
                placeholder="Selected users..."
                size="sm"
                value={formData.selectedUsers}
                onChange={(e) => handleChatListBoxAddValue(e)}
            />

            <div className="flex flex-column">
                {filteredContacts.map(contact => {
                    return (
                        <ChatListBox id={`contact-s-${contact.id}`} username={contact.username} chatPreview={""} borderBottom
                            onClick={() => handleChatListBoxAddValue(contact.username)}
                        />
                    )
                })}
            </div>

            {formData.selectedUsers.length && <Button icon="pi pi-arrow-right" className="p-button-rounded p-button-info absolute bottom-0 mb-1 fadein animation-duration-250" aria-label="User" onClick={() => setStep(2)} />}
        </div>
    )
}

export default CreateRoomSecondary;