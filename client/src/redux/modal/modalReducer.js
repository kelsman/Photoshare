import modalTypes from './modalTypes';

const initState = {
    showModal: false,
}

const modalReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case modalTypes.SHOW_MODAL:
            return {
                ...state,
                showModal: payload
            }
        case modalTypes.HIDE_MODAL:
            return {
                ...state,
                showModal: payload
            }

        default:
            return state
    }
}

export default modalReducer;