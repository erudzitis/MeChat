export const MIN_PASSWORD_LEN = 6;
export const MIN_USERNAME_LEN = 3;
export const ACCESS_TOKEN = "accessToken";
export const ACCESS_TOKEN_ERROR_MSG = "Unauthorized, invalid access token!";
export const REFRESH_TOKEN_ERROR_MSG = "Forbidden, invalid refresh token!";
export const ACCESS_TOKEN_PATTERN = new RegExp("^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$");