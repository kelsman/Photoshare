import React, { useState } from 'react';
import { BiHide } from 'react-icons/bi';
import { BiShow } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { IconContext } from "react-icons";
import './style.scss';

import LogInSvg from '../../../assets/images/Login.svg'
import photoLogo from '../../../assets/images/camera.webp'
import { Link, withRouter } from 'react-router-dom';

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//redux
import { connect } from 'react-redux';
import { loadUser, signIn } from '../../../redux/actions/user/user.actions'


const LogIn = ({ loginError, history, loadUser, signIn }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [Hide, setHide] = useState(true)

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleHideToggle = () => {
        setHide(!Hide)
    };

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        try {

            await signIn(formData, history);



        } catch (err) {

            console.log(err)
        }
    }

    const { email, password } = formData;
    return (
        <div className="LogInWrapper">

            <div className=" HeaderContainer">
                <div className="header">

                    <img src={photoLogo} alt="camera" />
                    <h2>
                        photoshare
                    </h2>
                </div>

            </div>
            <section className="form-section">
                <div className="svg">
                    <img src={LogInSvg} alt="LogInSvg" />
                </div>
                <div className="login-form">
                    <h3> member Login</h3>

                    <form action="" onSubmit={handleFormSubmit}>

                        <div className="email-input">

                            <span>
                                <HiOutlineMail />
                            </span>
                            <input type="email"
                                name="email"
                                id="email"
                                placeholder="enter email address"
                                value={email}
                                onChange={handleChange}

                            />

                        </div>
                        <div className="password-input">
                            <div>
                                <span>
                                    <RiLockPasswordFill />
                                </span>
                                <input
                                    type={Hide === true ? "password" : "text"}
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleChange}
                                    style={{ width: "100%" }}
                                />

                            </div>
                            {Hide === true &&
                                <IconContext.Provider value={{ className: "togglebtn" }}>
                                    <BiHide
                                        onClick={handleHideToggle} />

                                </IconContext.Provider>
                            }
                            {Hide === false &&
                                <IconContext.Provider value={{ className: "togglebtn" }}>
                                    <BiShow onClick={handleHideToggle} />
                                </IconContext.Provider>

                            }
                        </div>
                        <div className="login-btn">
                            <button type="submit">
                                Login
                             </button>
                        </div>

                        <p> Dont have an Account? <Link to="/register"> Sign up
                         <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                                <AiOutlineArrowRight />

                            </IconContext.Provider>
                        </Link></p>
                    </form>
                </div>

            </section>
            <ToastContainer autoClose={2000} />
        </div>

    )
};
const mapDispatchToProps = {
    loadUser,
    signIn
};
const mapStateToProps = ({ user }) => {
    return {
        loginError: user.errors.login,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogIn));