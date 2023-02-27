import { ACCESS_TOKEN } from "./contants";
import { IChatRoomParticipant } from "./types";

export const setAccessToken = (value: string): void => {
    localStorage.setItem(ACCESS_TOKEN, value);
}

export const getAccessToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN) || null;
}

export const clearAccessToken = (): void => {
    localStorage.removeItem(ACCESS_TOKEN);
}

export const createInitials = (name = "?"): string => {
    return name.match(/(\b\S)?/g)?.join("")?.match(/(^\S|\S$)?/g)?.join("").toUpperCase() || name.charAt(0);
}

export const participantsFormat = (participants: Array<IChatRoomParticipant>): string => {
    return participants.map(participant => participant.username).join(", ");
}