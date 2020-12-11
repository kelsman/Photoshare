import React, { Fragment, useState } from 'react';
import Logo from '../../../assets/images/logo.jpg'
import './style.scss';
function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })

    };
    const handleSubmit = async (e) => {
        e.preventDefault();

    }
    return (
        <Fragment>

            <div className="logo">

                <form action="" onSubmit={handleSubmit}>

                    <div className="logo">

                        <h2 className="log-text"> Photoshare</h2>
                        <div className="logo-image">
                            <img src={Logo} alt="logo" />
                        </div>
                    </div>

                    <div className="form-details">
                        <input type="text"
                            placeholder="email"
                            value={email}
                            name="email"
                            onChange={handleChange}
                        />
                        <input type="password"
                            placeholder="password"
                            value={password}
                            name="password"
                            onChange={handleChange}
                        />
                        <input type="submit"
                            name="submit"
                            value="login"
                        />
                    </div>


                </form>
                <p> Don't have an account? sign up</p>

            </div>

        </Fragment>
    )
};

export default Login