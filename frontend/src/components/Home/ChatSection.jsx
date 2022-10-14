// Requirements
import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ToggleButton } from "primereact/togglebutton";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import EmojiPicker from "emoji-picker-react";

// Components
import AvatarButton from "../Main/AvatarButton";
import ChatMessage from "../Main/ChatMessage";
import Center from "../Custom/Center";
import Stack from "../Custom/Stack";

// Actions
import { createMessageAction } from "../../actions/chat";

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
    if (!RETRIEVE_ROOM_DATA) {
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
        <div className="flex flex-1 surface-card flex-column fadein animation-duration-500">
            {/* Top wrapper */}
            <div className="flex align-items-center h-5rem">
                <AvatarButton image={`${process.env.PUBLIC_URL}/images/defaultAvatar.png`} shape="circle" size="xlarge" />
                <h4 className="p-0 m-0 ml-2 text-white">{chatRoomName}</h4>
            </div>

            {/* Middle wrapper */}
            <div className="flex flex-1 flex-shrink-0 flex-column gap-2 overflow-y-auto p-1 pl-5 pr-5">
                {roomData?.messages && roomData.messages.map(message => {
                    return (
                        <ChatMessage
                            key={`chat-message-${roomData.roomId}-${message.id}`}
                            content={message.content}
                            timestamp={message.created_at}
                            myMessage={decodedUser.id === message.user_id}
                        />
                    )
                })}

                <div ref={chatMessagesEndReference} />
            </div>

            {/* Bottom wrapper */}
            <div className="relative flex flex-row align-items-center justify-content-center gap-2 h-5rem p-2">
                {showEmojiPicker &&
                    <div className="absolute bottom-50 fadein animation-duration-500">
                        <EmojiPicker onEmojiClick={handleEmojiClick} lazyLoadEmojis />
                        <div className="h-3rem" />
                    </div>
                }

                <ToggleButton onIcon="pi pi-minus" onLabel="" offIcon="pi pi-plus" offLabel="" checked={showEmojiPicker} onChange={(e) => setShowEmojiPicker(e.value)} />
                <InputText type="text" className="p-inputtext-md w-full" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                <Button onClick={handleChatMessage} icon="pi pi-send" iconPos="right" disabled={!inputMessage} />
            </div>
        </div>
    )
}

export default ChatSection;