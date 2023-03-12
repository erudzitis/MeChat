![Logo](https://i.imgur.com/cSIjrg4.png)

# MeChat

Realt-time chat application written using NodeJS, Express, React, PostgreSQL, Websocket technology stack.


## Screenshots

![App Screenshot](https://i.imgur.com/olFvbyM.png)


## Appendix

Authentication is performed using access, refresh token mechanism, where short-lived access token gets stored in browsers localstorage and periodically (having received unauthorized response from the server) gets refreshed using long-lived refresh token stored as a http secure cookie.

There are no CSRF tokens being used in forms at the moment, therefore the application could be vulnerable to a CSRF attack.


## Features

- Group or 1-on-1 realt-time chat
- Adding friends, creating groups
- Real-time user state, for example, online / typing


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PG_CONNECTION_STRING_DEV`

`JWT_SECRET`

`JWT_EXPIRES_IN` short-lived, for instance, 60000 ms = 1 minute

`JWT_REFRESH_SECRET`

`JWT_REFRESH_EXPIRES_IN` long-lived, for instance, 604800000 ms = 1 week
