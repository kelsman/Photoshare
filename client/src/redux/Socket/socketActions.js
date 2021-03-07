import socketTypes from './socketTypes';
import { connectSocket } from '../../services/socketService'

export const connectSocketIo = () => {

    return (dispatch) => {
        const socket = connectSocket();
        dispatch({ type: socketTypes.CONNECT_SOCKET, payload: socket })


    }
}