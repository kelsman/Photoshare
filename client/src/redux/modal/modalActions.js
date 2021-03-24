import modalTypes from './modalTypes';

export const showModal = () => {
  return {
    type: modalTypes.SHOW_MODAL,
    payload: true,
  };
};

export const hideModal = () => ({
  type: modalTypes.HIDE_MODAL,
  payload: false,
});
