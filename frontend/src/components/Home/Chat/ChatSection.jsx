// Requirements
import jwtDecode from "jwt-decode";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Center from "../../Custom/Center";
import Stack from "../../Custom/Stack";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

// Actions
import { createMessageAction } from "../../../actions/chat";

const ChatSection = () => {
    const dispatch = useDispatch();
    const { roomData } = useSelector(state => state.chat);
    const { RETRIEVE_ROOM_DATA } = useSelector(state => state.helper);
    const [inputMessage, setInputMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // Reference for last element in chat list
    const chatMessagesEndReference = useRef(null);

    // TODO: write a component wrapper that deals with jwt authorization/decoding
    const decodedUser = jwtDecode(localStorage.getItem("chatApplicationToken"));

    // Creating room name
    const chatRoomName = roomData?.participants.find(p => p.id !== decodedUser.id)?.username;

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

    // Scrolling to the latest message
    useEffect(() => {
        handleScrollToLatestMessage();
    }, [roomData])

    // There's no room data, we display default message to the user
    if (!RETRIEVE_ROOM_DATA || !roomData) {
        return (
            <Center className="w-full surface-card">
                <Stack spacing={4}>
                    <h4 className="p-0 m-0 text-white font-normal">Select a contact or a group to start messaging!</h4>
                    <Button label="Create conversation" />
                </Stack>
            </Center>
        )
    }

    return (
        <Stack className="flex-1 surface-card fadein animation-duration-500">
            {/* Top wrapper */}
            <ChatHeader name={chatRoomName} />

            {/* Middle wrapper */}
            <Stack className="flex-1 flex-shrink-0 overflow-y-auto p-4" spacing={4}>
                {roomData?.messages && <ChatBody messages={roomData.messages} userId={decodedUser.id} />}

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