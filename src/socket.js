
import { io } from "socket.io-client";

export const socket = io("https://tambola-backend-ooby.onrender.com", {
  transports: ["websocket"],
  autoConnect: true,
});
// export const socket = io("http://localhost:2004", {
//   transports: ["websocket"],
//   autoConnect: true,
// });