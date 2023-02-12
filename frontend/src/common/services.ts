import { ACCESS_TOKEN } from "./contants"

export const setAccessToken = (value: string): void => {
    localStorage.setItem(ACCESS_TOKEN, value);
}

export const getAccessToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN) || null;
}

export const clearAccessToken = (): void => {
    localStorage.removeItem(ACCESS_TOKEN);
}

