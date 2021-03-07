import io from 'socket.io-client';

export const connectSocket = () => {
    const socket = io.connect('/')

    socket.on('connect', () => {
        console.log('socket connected')
    })

    return socket;
}