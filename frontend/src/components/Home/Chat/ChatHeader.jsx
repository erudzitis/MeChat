// Requirements
import { useRef, useMemo } from "react";
import { Button } from "primereact/button";
import { SlideMenu } from "primereact/slidemenu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import Stack from "../../Custom/Stack";
import Flex from "../../Custom/Flex";
import AvatarButton from "../../Main/AvatarButton";

// Actions
import { addRoomUserAction, leaveRoomAction, removeContactAction } from "../../../actions/chat";

// Utils
import { participantString, participantTypingState } from "../../../utils";

// Constants
import { S3_BUCKET_URL } from "../../../constants";
import { websocketConstants, websocketUtils } from "../../../services/websockets/utils";

const ChatHeader = ({ name, image, isGroupChat, isAdmin }) => {
    const popupMenu = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { roomData, contacts, onlineUsers, typingUsers } = useSelector(state => state.chat);
    const { userData } = useSelector(state => state.auth);

    // Retrieving header room info
    const headerRoomInfo = useMemo(() => {
        // All data hasn't loaded in
        if (!roomData || !onlineUsers) return "Click here for more info";

        // If there are users typing
        // If user is typing, we return this state
        if (typingUsers && typingUsers[roomData.roomId] && typingUsers[roomData.roomId].length) {
            return participantTypingState(roomData.participants, typingUsers[roomData.roomId]);
        }

        // If it's a group chat, we want to return list of all participants
        if (isGroupChat) {
            return participantString(roomData.participants, userData?.id);
        }

        // Otherwise it's 1-1 conversation, we want to return user online state
        // Computing our chat recipient
        const recipient = roomData.participants.filter(participant => participant.id !== userData?.id)[0];
        const isRecipientOnline = onlineUsers.indexOf(recipient.id) >= 0;

        return isRecipientOnline ? "Online" : "Offline";
    }, [roomData, onlineUsers, typingUsers]);

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

        // Dispatching event
        dispatch(removeContactAction(query, navigate));
        // Leaving room
        websocketUtils.emit(websocketConstants.DISCONNECT_ROOM, {
            contactRooms: [roomData.id],
        })
    }

    // Function for leaving group room
    const leaveGroup = () => {
        const query = {
            roomId: roomData.roomId
        }

        // Dispatching event
        dispatch(leaveRoomAction(query, navigate));
        // Leaving group
        websocketUtils.emit(websocketConstants.DISCONNECT_ROOM, {
            groupRooms: [roomData.id],
        })
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
                    <AvatarButton
                        image={image ? `${S3_BUCKET_URL}/${image}` : `${process.env.PUBLIC_URL}/images/defaultAvatar.png`}
                        shape="circle"
                        size="xlarge"
                    />
                    <Stack spacing={1}>
                        <h3 className="p-0 m-0 ml-2 text-white">{name}</h3>
                        <h4 className="p-0 m-0 ml-2 text-300 font-normal cursor-pointer">{headerRoomInfo}</h4>
                    </Stack>
                </Flex>
                <Flex className="p-3 gap-1">
                    <Button icon="pi pi-phone" className="p-button-rounded p-button-text" />
                    <Button icon="pi pi-list" className="p-button-rounded p-button-text" onClick={(e) => popupMenu.current.toggle(e)} />
                </Flex>
            </Flex>
        </>
    )
}

export default ChatHeader;