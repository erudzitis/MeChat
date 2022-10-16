// Requirements
import { useRef } from "react";
import { Button } from "primereact/button";
import { SlideMenu } from "primereact/slidemenu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import Flex from "../../Custom/Flex";
import AvatarButton from "../../Main/AvatarButton";

// Actions
import { addRoomUserAction, leaveRoomAction, removeContactAction } from "../../../actions/chat";

const ChatHeader = ({ name, image, isGroupChat, isAdmin }) => {
    const popupMenu = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { roomData, contacts } = useSelector(state => state.chat);
    const { userData } = useSelector(state => state.auth);

    // Calculating possible participant candidates
    const participantCandidates = (contacts && roomData) ? contacts.filter(contact => !roomData.participants.some(participant => participant.id === contact.id)) : [];

    // Function for removing a contact and room
    const removeContact = () => {
        // Extracting contact id from the list of room data participants. Since this is not a group chat, we can easily acquire our contact id
        const contactId = roomData.participants.reduce((result, { id }) => [...result, ...(id !== userData.id) ? [id] : []], [])[0];

        const query = {
            roomId: roomData.roomId,
            contactId
        }

        dispatch(removeContactAction(query, navigate));
    }

    // Function for leaving group room
    const leaveGroup = () => {
        const query = {
            roomId: roomData.roomId
        }

        dispatch(leaveRoomAction(query, navigate));
    }

    // Function for adding a user to a group
    const addUser = (userId) => {
        const query = {
            targetId: userId,
            roomId: roomData.roomId
        }

        dispatch(addRoomUserAction(query));
    }


    const popupMenuItems = isGroupChat ? 
    [
        {
            label: "Leave",
            icon: "pi pi-times",
            command: () => leaveGroup()
        },
        isAdmin && {
            label: "Add user",
            icon: "pi pi-user",
            items: participantCandidates.map(contact => {
                return {
                    label: contact.username,
                    command: () => addUser(contact.id)
                }
            })
        }
    ] 
    : 
    [
        {
            label: "Remove",
            icon: "pi pi-times",
            command: () => removeContact()
        }        
    ];

    return (
        <>
            <SlideMenu ref={popupMenu} model={popupMenuItems} popup className="mt-2 h-auto" />

            <Flex className="h-5rem" align="center">
                <Flex className="flex-1 p-2" align="center">
                    <AvatarButton image={image} shape="circle" size="xlarge" />
                    <h3 className="p-0 m-0 ml-2 text-white">{name}</h3>
                </Flex>
                <Flex className="p-3">
                    <Button icon="pi pi-list" className="p-button-rounded p-button-text" onClick={(e) => popupMenu.current.toggle(e)} />
                </Flex>
            </Flex>
        </>
    )
}

export default ChatHeader;