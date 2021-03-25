import React from 'react'
import './style.scss';
const Divider = ({ children }) => {

    return (
        <h4
            className={
                children ? 'divider--split' : 'divider'
            }
        >
            {children}
        </h4>
    )
};
export default Divider;