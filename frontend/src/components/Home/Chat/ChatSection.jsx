// Requirements
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// Components
import Center from "../../Custom/Center";
import Stack from "../../Custom/Stack";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import ContactModal from "./ContactModal";
import GroupModal from "./GroupModal";

// Actions
import { clearRoomDataAction, createMessageAction, retrieveRoomDataAction } from "../../../actions/chat";

const ChatSection = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const { roomData } = useSelector(state => state.chat);
    const { userData } = useSelector(state => state.auth);
    const { RETRIEVE_ROOM_DATA } = useSelector(state => state.helper);

    const [inputMessage, setInputMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showGroupModal, setShowGroupModal] = useState(false);

    // Retrieving room id from url search parameters
    const roomId = searchParams.get("roomId");

    // Reference for last element in chat list
    const chatMessagesEndReference = useRef(null);

    // Creating room name
    const chatRoomName = roomData?.participants.find(p => p.id !== userData.id)?.username;

    // Handles emoji click action
    const handleEmojiClick = (event) => {
        setInputMessage(inputMessage + event.emoji);
    }

    // Handles scrolling the latest messages into view, using invisible div below all the messages as reference
    const handleScrollToLatestMessage = () => {
        chatMessagesEndReference.current?.scrollIntoView({ behavior: "smooth" })
    }

    // Handles sending message to the backend and updating local state
    const handleChatMessage = () => {
        if (inputMessage.length === 0) return;

        const query = {
            roomId: roomData?.roomId,
            content: inputMessage
        }

        dispatch(createMessageAction(query));
        setInputMessage("");
    }

    // Retrieving latest room data
    useEffect(() => {
        // Closing modals
        setShowContactModal(false);
        setShowGroupModal(false);
        // if there's no room open, we don't fetch data
        if (!roomId) return;

        // Clearing any saved room data in state
        dispatch(clearRoomDataAction());
        // Retrieving room data
        dispatch(retrieveRoomDataAction(roomId));
    }, [roomId]);

    // Scrolling to the latest message
    useEffect(() => {
        handleScrollToLatestMessage();
    }, [roomData])

    // There's no room data, we display default message to the user
    if (!roomId) {
        return (
            <Center className="w-full surface-card gap-3">
                <ContactModal show={showContactModal} setShow={setShowContactModal} />
                <GroupModal show={showGroupModal} setShow={setShowGroupModal} />

                <h4 className="p-0 m-0 text-white font-normal">Select a contact or a group to start messaging!</h4>
                <Button label="Create contact" icon="pi pi-user-plus" iconPos="right" onClick={() => setShowContactModal(true)} />
                <Button label="Create group" icon="pi pi-users" iconPos="right" onClick={() => setShowGroupModal(true)} />
            </Center>
        )
    }

    return (
        <Stack className="flex-1 surface-card fadein animation-duration-500">
            {/* Top wrapper */}
            <ChatHeader name={chatRoomName} />

            {/* Middle wrapper */}
            <Stack className="flex-1 flex-shrink-0 overflow-y-auto p-4" spacing={4}>
                {roomData?.messages && <ChatBody messages={roomData.messages} userId={userData.id} />}

                <div ref={chatMessagesEndReference} />
            </Stack>

            {/* Bottom wrapper */}
            <ChatFooter
                handleChat={handleChatMessage}
                handleEmoji={handleEmojiClick}
                showEmoji={showEmojiPicker}
                setShowEmoji={setShowEmojiPicker}
                message={inputMessage}
                setMessage={setInputMessage}
            />
        </Stack>
    )
}

export default ChatSection;