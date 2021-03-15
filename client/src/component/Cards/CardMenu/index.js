
import React from 'react';
import './style.scss';
import * as Icon from 'react-feather'

// import { connect } from 'react-redux';


const CardMenu = () => {




    return (
        <div className="cardMenu">
            <div className="interactions">

                <Icon.Heart
                    className="icon" />
                <Icon.MessageCircle className="icon" />
                <Icon.Share className="icon" />
            </div>
            <Icon.Bookmark className="icon" />
        </div>
    )
}

export default CardMenu;