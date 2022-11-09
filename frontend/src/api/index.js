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
export const registerAPICall = (formData) => {
    return chatApplicationAPI.post("/auth/register", formData);
}

export const loginAPICall = (formData) => {
    return chatApplicationAPI.post("/auth/login", formData);
}

export const createRoomAPICall = (formData) => {
    return chatApplicationAPI.post("/room/create", formData, { headers: { "Content-Type": "multipart/form-data" } });
}

export const leaveRoomAPICall = (formData) => {
    return chatApplicationAPI.post("/room/leave", formData);
}

export const establishContactAPICall = (formData) => {
    return chatApplicationAPI.post("user/create_contact", formData);
}

export const removeContactAPICall = (formData) => {
    return chatApplicationAPI.post("user/remove_contact", formData);
}

export const retrieveContactsAPICall = (signal) => {
    return chatApplicationAPI.get("/user/contacts", { signal });
}

export const retrieveRoomsAPICall = (signal) => {
    return chatApplicationAPI.get("/user/rooms", { signal });
}

export const createMessageAPICall = (formData) => {
    return chatApplicationAPI.post("/message/create", formData);
}

export const retrieveRoomDataAPICall = (roomId, signal) => {
    return chatApplicationAPI.get(`/room/info/${roomId}`, { signal });
}

export const addRoomUserAPICall = (formData) => {
    return chatApplicationAPI.post("/room/add_user", formData);
}

export const readRoomAPICall = (formData) => {
    return chatApplicationAPI.post("/room/read", formData);
}