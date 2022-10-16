// Requirements
import { useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import Flex from "../../Custom/Flex";
import AvatarButton from "../../Main/AvatarButton";

// Actions
import { leaveRoomAction, removeContactAction } from "../../../actions/chat";

const ChatHeader = ({ name, image, isGroupChat }) => {
    const popupMenu = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { roomData } = useSelector(state => state.chat);
    const { userData } = useSelector(state => state.auth);

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


    const popupMenuItems = [
        {
            label: "Options",
            items:
                !isGroupChat ? [
                    {
                        label: "Remove",
                        icon: "pi pi-times",
                        command: () => removeContact()
                    }
                ] : [
                    {
                        label: "Exit",
                        icon: "pi pi-times",
                        command: () => leaveGroup()
                    },
                    {
                        label: "Add user",
                        icon: "pi pi-user"
                    }
                ]
        }
    ];

    return (
        <>
            <Menu ref={popupMenu} model={popupMenuItems} popup className="mt-2" />

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