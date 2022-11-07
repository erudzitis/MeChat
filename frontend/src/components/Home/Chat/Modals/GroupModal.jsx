// Requirements
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import Flex from "../../../Custom/Flex";
import Stack from "../../../Custom/Stack";
import FileUploadCustom from "../../../Main/FileUploadCustom";
import InputFloatLabel from "../../../Main/InputFloatLabel";

// Actions
import { createRoomAction } from "../../../../actions/chat";

import { newFormData } from "../../../../utils";

// Determines how many contacts are displayed by default in the contact list
const DISPLAYED_CONTACT_LIMIT = 5;

const GroupModal = ({ show, setShow }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { contacts } = useSelector(state => state.chat);
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [contactUsername, setContactUsername] = useState("");
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    // Filtering user contacts based on search, if provided
    const filteredContacts = useMemo(() => {
        if (!contacts) return [];
        if (!contactUsername) return contacts.slice(0, DISPLAYED_CONTACT_LIMIT);

        const filteredArray = (contactUsername !== "") ? contacts.filter(contact => contact.username.indexOf(contactUsername) >= 0) : contacts;

        return filteredArray.slice(0, DISPLAYED_CONTACT_LIMIT);
    }, [contactUsername, contacts]);

    const handleSelectedContacts = (contact) => {
        // Checking whether user is already selected
        const contactAlreadySelected = selectedContacts.some(selectedContact => selectedContact.email === contact.email);
        // If user is already selected, we remove him from the list
        if (contactAlreadySelected) {
            setSelectedContacts(prev => prev.filter(c => c.email !== contact.email));
        } else {
            setSelectedContacts(prev => [...prev, contact]);
        }
    }

    // Handling room creation
    const handleCreateGroup = () => {
        const query = newFormData({
            name: groupName,
            description: groupDescription,
            groupUsers: selectedContacts.map(sc => sc.id),
            isGroupChat: true,
            image: selectedFile
        });

        dispatch(createRoomAction(query, navigate));
    }

    return (
        <Dialog header="Create a new group" visible={show} draggable={false} onHide={() => setShow(false)}>
            <Stack className="py-2 w-20rem" spacing={3}>
                <FileUploadCustom setSelectedFile={setSelectedFile} />
                <InputFloatLabel id="create-group-name" label="Group name" size="sm" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                <InputFloatLabel id="create-group-description" label="Group description" size="sm" value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} />
                <Divider />

                <InputFloatLabel id="create-group-search-user" label="Contact username" size="sm" value={contactUsername} onChange={(e) => setContactUsername(e.target.value)} />

                <Stack spacing={1}>
                    {filteredContacts && filteredContacts.map(contact => {
                        return (
                            <Flex key={`cl-${contact.id}`} className="cursor-pointer transition-all transition-duration-500 hover:surface-card p-2 border-round" align="center" justify="between">
                                <h4 className="m-0 p-0 font-normal">{contact.username}</h4>
                                <Button label="Select" className="p-button-sm" onClick={() => handleSelectedContacts(contact)} />
                            </Flex>
                        )
                    })}
                </Stack>

                <Stack direction="row" spacing={2}>
                    {selectedContacts.map(selectedContact => {
                        return (
                            <Flex key={`cs-${selectedContact.id}`} className="surface-card w-max p-2 border-round gap-2 fadein animation-duration-250" align="center" justify="center">
                                <h4 className="m-0 p-0 font-normal">{selectedContact.username}</h4>
                                <i className="pi pi-ban mt-1 cursor-pointer" style={{ "fontSize": "10px" }} onClick={() => handleSelectedContacts(selectedContact)}></i>
                            </Flex>
                        )
                    })}
                </Stack>

                {(selectedContacts.length > 0) && <Button label="Create now!" onClick={handleCreateGroup} disabled={!groupName || !groupDescription} />}
            </Stack>
        </Dialog>
    )
}

export default GroupModal;