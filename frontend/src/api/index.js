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

const retrieveContactsAPICall = () => {
    return chatApplicationAPI.get("/user/contacts");
}

const retrieveRoomsAPICall = () => {
    return chatApplicationAPI.get("/user/rooms");
}

const createMessageAPICall = (formData) => {
    return chatApplicationAPI.post("/message/create", formData);
}

const retrieveRoomDataAPICall = (roomId) => {
    return chatApplicationAPI.get(`/room/info/${roomId}`);
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
    retrieveRoomDataAPICall
}