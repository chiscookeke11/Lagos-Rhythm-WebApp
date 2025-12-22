import { io, Socket } from "socket.io-client";

const SOCKET_URL =
    process.env.NEXT_PUBLIC_SOCKET_URL!;

export const socket: Socket = io(SOCKET_URL, {
    autoConnect: false,
});
