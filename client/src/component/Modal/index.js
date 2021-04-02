import React from 'react'
// import Modal from 'react-modal'
import './style.scss';


import { Modal } from 'react-responsive-modal'
const ModalComponent = ({ children, open, hide, setModal }) => {


    return (
        <Modal
            open={open}
            onClose={hide}
            center
            showCloseIcon={false}
            classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
                overlayAnimationIn: 'customEnterOverlayAnimation',
                overlayAnimationOut: 'customLeaveOverlayAnimation',
                modalAnimationIn: 'customEnterModalAnimation',
                modalAnimationOut: 'customLeaveModalAnimation',
            }}
            animationDuration={800}
        >
            {children}
        </Modal>
    )
};

export default ModalComponent;