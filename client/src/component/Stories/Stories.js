import { useState } from 'react';
import './style.scss';
import HorizontalScroll from "react-scroll-horizontal";
import Story from '../Story/Story';

const Stories = () => {

    return (
        <div className="stories__container">
            <HorizontalScroll className="stories__scroll" reverseScroll={true} animValues={2}>
                <Story />
            </HorizontalScroll>

        </div>
    )
};


export default Stories;