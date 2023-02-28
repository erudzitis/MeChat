import { ACCESS_TOKEN } from "./contants";
import { IChatRoomParticipant, ITyping } from "./types";

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

export const typingParticipants = (participants: Array<IChatRoomParticipant>, typing: ITyping): string => {
    if (!participants || !typing) return "";

    let typingUsernames = [];

    for (const [userId, isTyping] of Object.entries(typing)) {
        if (!isTyping) continue;

        const participant = participants.find(p => p.id === parseInt(userId));

        if (participant) {
            typingUsernames.push(participant.username);
        }
    }

    return typingUsernames.length ? (typingUsernames.join(", ") + " is typing...") : "";
}