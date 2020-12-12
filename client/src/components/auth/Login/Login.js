import React, { Fragment, useState } from 'react';
// import Logo from '../../../assets/images/logo.jpg'
import './style.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signIn } from '../../../redux/actions/user/user.actions';
// import Loading from '../../../assets/images/loading.gif'
import Spinner from '../../spinner';
function Login(props) {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false)
    const { email, password } = formData

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { signIn, history } = props;

        await signIn(formData, history);


    }
    return (
        <Fragment >
            <div className="login-container">




                <div className="logo">

                    <h1 className="logo-text"> Photoshare</h1>
                    <p> share beautiful experiences, moments  with friends</p>

                </div>
                <form action="" onSubmit={handleSubmit} className="login-form">
                    <h4> Log in</h4>
                    {loading === true && <Spinner />}
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
                            onClick={() => setLoading(true)}
                        />
                    </div>


                    <p> Don't have an account? <Link to="/signup"> <span style={{ color: "orange" }}>sign up</span></Link></p>
                </form>


            </div>

        </Fragment>
    )
};
const mapDispatchToProps = {
    signIn
}
export default connect(null, mapDispatchToProps)(withRouter(Login));