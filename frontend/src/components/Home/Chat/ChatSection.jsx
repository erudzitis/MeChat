// Requirements
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useSearchParams } from "react-router-dom";

// Components
import Center from "../../Custom/Center";
import Stack from "../../Custom/Stack";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import ContactModal from "./Modals/ContactModal";
import GroupModal from "./Modals/GroupModal";

// Actions
import { 
    clearRoomDataAction, 
    createMessageAction, 
    retrieveRoomDataAction, 
    receivedMessageHandleAction, 
    receivedOnlineUsersHandleAction, 
    receivedTypingUserHandleAction,
    receivedNotTypingUserHandleAction
} from "../../../actions/chat";

// Hooks
import UseAction from "../../../hooks/UseAction";

// socket.io utils
import { websocketUtils, websocketConstants } from "../../../services/websockets/utils";

const ChatSection = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const { roomData, rooms } = useSelector(state => state.chat);
    const { userData } = useSelector(state => state.auth);

    const [inputMessage, setInputMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    // Retrieving room id from url search parameters
    const roomId = searchParams.get("roomId");

    // Reference for last element in chat list
    const chatMessagesEndReference = useRef(null);

    // Room can either be a 1-1 converstation or group chat
    const isGroupChat = roomData?.is_group_chat;
    // Room admins have escalated privilages
    const isAdmin = roomData?.admin_id === userData?.id;

    // Creating room name
    const chatRoomName = isGroupChat ? roomData.name : roomData?.participants.find(p => p.id !== userData.id)?.username;

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

        // Posting message query to backend
        dispatch(createMessageAction(query));
        // Posting message to the room
        websocketUtils.emit(websocketConstants.ROOM_MESSAGE, {
            content: inputMessage,
            username: userData.username,
            roomId: roomData.roomId,
            userId: userData.id
        })
        // Clearing input
        setInputMessage("");
    }

    // Retrieving latest room data
    UseAction(retrieveRoomDataAction, roomId);

    useEffect(() => {
        // Closing modals
        setShowContactModal(false);
        setShowGroupModal(false);
        // Clearing any saved room data in state
        dispatch(clearRoomDataAction());
    }, [roomId]);

    // Scrolling to the latest message
    useEffect(() => {
        if (!roomId) return;

        handleScrollToLatestMessage();
    }, [roomData?.messages?.length]);

    // Handling socket connection
    useEffect(() => {
        websocketUtils.registerEvent(websocketConstants.CONNECT, () => {
            console.log(`Websocket connection established, id: ${websocketUtils.getSocketId()}`);
        });

        // Having recieved message for the specific room, we dispatch it and populate the room messages
        websocketUtils.registerEvent(websocketConstants.RECEIVE_ROOM_MESSAGE, data => {
            dispatch(receivedMessageHandleAction(data));
        })

        // Retrieving online users count
        websocketUtils.registerEvent(websocketConstants.RECEIVE_ONLINE_USERS, data => {
            dispatch(receivedOnlineUsersHandleAction(data));
        })

        // Retrieving users that are typing
        websocketUtils.registerEvent(websocketConstants.RECEIVE_USER_TYPING, data => {
            dispatch(receivedTypingUserHandleAction(data));
        })

        // Retrieving users that are not typing
        websocketUtils.registerEvent(websocketConstants.RECEIVE_USER_NOT_TYPING, data => {
            dispatch(receivedNotTypingUserHandleAction(data));
        })

        // Remove socket event listener on component unmount
        return () => {
            websocketUtils.unregisterEvents(
                websocketConstants.RECEIVE_ROOM_MESSAGE, 
                websocketConstants.RECEIVE_ONLINE_USERS, 
                websocketConstants.RECEIVE_USER_TYPING,
                websocketConstants.RECEIVE_USER_NOT_TYPING
            );
        }
    }, []);

    // 
    useEffect(() => {
        if (!userData) return;

        // Emitting initial connection event
        websocketUtils.clientConnect(userData.id);
    }, [userData])

    // Handling user typing state
    useEffect(() => {
        if (!roomData) return;

        websocketUtils.emit(isTyping ? websocketConstants.USER_TYPING : websocketConstants.USER_NOT_TYPING, {
            roomId: roomData?.roomId,
            userId: userData?.id
        })

    }, [isTyping]);

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
        <Stack className="flex-1 surface-card fadein animation-duration-350">
            {/* Top wrapper */}
            <ChatHeader image={`https://chatapplicationbucket.s3.us-east-2.amazonaws.com/${roomData?.picture}`} name={chatRoomName} isGroupChat={isGroupChat} isAdmin={isAdmin} />

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
                setIsTyping={setIsTyping}
            />
        </Stack>
    )
}

export default ChatSection;