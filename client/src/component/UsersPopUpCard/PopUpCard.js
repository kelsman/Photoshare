import React, { useEffect } from 'react'
import './style.scss';


function PopUpCard({ hide, children }) {
    useEffect(() => {
        if (hide) {
            window.addEventListener('click', hide);
        }

        return () => {
            window.removeEventListener('click', hide);
        };
    }, [hide]);
    return (

        <div className="pop__up__card">
            <ul>
                {children}
            </ul>
        </div>
    )
}

export default PopUpCard
