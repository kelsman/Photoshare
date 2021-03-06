import io from 'socket.io-client';

export const connectSocket = () => {
    const socket = io.connect('/')
    return socket;
}