import React from 'react';
import './style.scss';

const styles = {
    div: {
        width: "100%",
        height: "10vh",
        backgroundColor: "#333333",

    },
    h1: {
        fontFamily: 'Akaya Telivigala',
    }
}

const Header = () => {
    return (


        <React.Fragment>
            <div className="header">
                <h1> Photoshare</h1>
            </div>
        </React.Fragment>

    )
};

export default Header;