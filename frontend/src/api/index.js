// Requirements
import axios from "axios";

// Creating axios instance
const chatApplicationAPI = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    }
});

// Request interceptor for API
// TODO: Implement refresh token system
chatApplicationAPI.interceptors.request.use((request) => {
    const token = localStorage.getItem("chatApplicationToken");

    // Checking whethr token is found on users browsers local storage
    if (token !== null && token !== undefined) {
        request.headers.authorization = `Bearer ${token}`;
    }

    return request;
});

// API Calls, that return Promise which has to be awaited further on
const registerAPICall = (formData) => {
    return chatApplicationAPI.post("/auth/register", formData);
}

const loginAPICall = (formData) => {
    return chatApplicationAPI.post("/auth/login", formData);
}

const createRoomAPICall = (formData) => {
    return chatApplicationAPI.post("/room/create", formData);
}

const leaveRoomAPICall = (formData) => {
    return chatApplicationAPI.post("/room/leave", formData);
}

const establishContactAPICall = (formData) => {
    return chatApplicationAPI.post("user/create_contact", formData);
}

const removeContactAPICall = (formData) => {
    return chatApplicationAPI.post("user/remove_contact", formData);
}

const retrieveContactsAPICall = (signal) => {
    return chatApplicationAPI.get("/user/contacts", { signal });
}

const retrieveRoomsAPICall = (signal) => {
    return chatApplicationAPI.get("/user/rooms", { signal });
}

const createMessageAPICall = (formData) => {
    return chatApplicationAPI.post("/message/create", formData);
}

const retrieveRoomDataAPICall = (roomId, signal) => {
    return chatApplicationAPI.get(`/room/info/${roomId}`, { signal });
}

const addRoomUserAPICall = (formData) => {
    return chatApplicationAPI.post("/room/add_user", formData);
}

export {
    registerAPICall,
    loginAPICall,
    createRoomAPICall,
    leaveRoomAPICall,
    retrieveContactsAPICall,
    establishContactAPICall,
    removeContactAPICall,
    retrieveRoomsAPICall,
    createMessageAPICall,
    retrieveRoomDataAPICall,
    addRoomUserAPICall
}