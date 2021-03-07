import socketTypes from './socketTypes';


const initState = {
    socket: null,
    socketConnected: false,

};

const socketReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case socketTypes.CONNECT_SOCKET:
            return {
                ...state,
                socket: payload
            }

        case socketTypes.DISCONNECT_SOCKET:
            {
                state.socket && state.socket.disconnect();
                return state;
            }
        default:
            return state;

    }
};
export default socketReducer;