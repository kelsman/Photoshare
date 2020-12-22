import React, { Fragment } from 'react'
import './style.scss';
import Logo from '../../assets/images/logo.jpg'
const StartUpLogo = () => {

    return (


        <Fragment>
            <div className="startLogo-wrapper">
                <h2> Photshare</h2>
                <div className="img-wrapper">
                    <img src={Logo} alt="logo" />
                </div>

                <div className="bottom-title">
                    <p>
                        from<br></br>
                        <span> KELSDEV</span>

                    </p>
                </div>

            </div>

        </Fragment>
    )

};

export default StartUpLogo;