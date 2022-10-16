// Requirements
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import InputFloatLabel from "../../../Main/InputFloatLabel";
import Stack from "../../../Custom/Stack";
import Flex from "../../../Custom/Flex";

// Actions
import { createRoomAction } from "../../../../actions/chat";

const GroupModal = ({ show, setShow }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { contacts } = useSelector(state => state.chat);
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [contactUsername, setContactUsername] = useState("");
    const [selectedContacts, setSelectedContacts] = useState([]);

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

    const handleGroupImageUpload = (event) => {
        console.log(event);
    }

    // Handling room creation
    const handleCreateGroup = () => {
        const selectedContactsIds = selectedContacts.map(selectedContact => selectedContact.id);

        const query = {
            name: groupName,
            description: groupDescription,
            groupUsers: selectedContactsIds,
            isGroupChat: true
        }

        dispatch(createRoomAction(query, navigate));
    }

    return (
        <Dialog header="Create a new group" visible={show} draggable={false} onHide={() => setShow(false)}>
            <Stack className="py-2 w-20rem" spacing={3}>
                <FileUpload accept="image/*" name="groupImage" mode="basic" customUpload uploadHandler={handleGroupImageUpload} />
                <InputFloatLabel id="create-group-name" label="Group name" size="sm" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                <InputFloatLabel id="create-group-description" label="Group description" size="sm" value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} />
                <Divider />

                <InputFloatLabel id="create-group-search-user" label="Contact username" size="sm" value={contactUsername} onChange={(e) => setContactUsername(e.target.value)} />

                <Stack spacing={1}>
                    {contacts && contacts.map(contact => {
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