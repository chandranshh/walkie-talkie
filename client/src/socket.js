import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://walkie-talkie.adaptable.app/";

export const socket = io(URL);
