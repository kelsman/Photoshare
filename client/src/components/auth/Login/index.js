
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';


function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ''
    });
    const handleChange = (e) => {
        const [email, password] = 
    };
    return (
        <Fragment>
            <div className="login-wrapper">

                <div className="logo-name">
                    <h2>Photogram</h2>

                </div>

                <form action="" method="post" className="login-wrapper">

                    <div className="email-field">
                        <label htmlFor="#email"> Email</label>
                        <input type="email" name="email" id="email" placeholder="enter a valid email address" />
                    </div>
                    <div className="password-field">
                        <label htmlFor="#password"></label>
                        <input type="password" name="password" placeholder="enter password" id="password" onChange={handleChange} />
                    </div>



                </form>

            </div>

        </Fragment>

    )
}

export default Login;
