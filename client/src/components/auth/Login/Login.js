import React, { Fragment, useState } from 'react';
import Logo from '../../../assets/images/logo.jpg'
import './style.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signIn } from '../../../redux/actions/user/user.actions';

function Login(props) {

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
        const { signIn, history } = props;

        await signIn(formData, history)
        history.push('/signup')

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
                <p> Don't have an account? <Link to="/signup"> sign up</Link></p>

            </div>

        </Fragment>
    )
};
const mapDispatchToProps = {
    signIn
}
export default connect(null, mapDispatchToProps)(withRouter(Login));