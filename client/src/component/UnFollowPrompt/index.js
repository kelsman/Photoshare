import React from 'react'
import './style.scss';

import Divider from '../Divider';

const UnfollowPrompt = ({ username, imagesrc, unfollow, closeModal }) => {
    return (
        <div className="unfollow__prompt">
            <img style={{ width: '8rem', height: '8rem' }} src={imagesrc} alt="avatar" />
            <p
                style={{ marginTop: '3rem' }}
                className="heading-4"
            >
                {`Unfollow @${username}?`}

            </p>
            <button className="unfollow__btn" onClick={() => {
                unfollow()
                closeModal()
            }}> Unfollow</button>
            <button className="cancel__btn" onClick={closeModal}> Cancel</button>
        </div>
    )
}

export default UnfollowPrompt;