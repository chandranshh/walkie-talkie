import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://walkie-talkie-backend.onrender.com";

export const socket = io(URL);
