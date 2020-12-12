import React, { Fragment, Component } from 'react';
// import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signUp } from '../../../redux/actions/user/user.actions';
// import { Formik } from 'formik';

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errorMessage: {
                emailError: '',
                passwordERR: ''
            }
        }
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, password2 } = this.state;
        const { signUp, history } = this.props;
        const formData = { name, email, password, password2 }
        signUp(formData, history);

    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    render() {



        const { name, email, password, password2 } = this.state;
        return (
            <Fragment>
                <div className="signup">

                    <h2> sign up</h2>
                    <form action="" onSubmit={this.handleSubmit}>
                        <div className="name">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={this.handleChange}
                                value={name}
                                placeholder="name"
                            />


                        </div>
                        <div className="email">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={this.handleChange}
                                value={email}
                                placeholder="email"
                            />
                        </div>
                        <div className="password">
                            <input type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                value={password}
                                onChange={this.handleChange} />
                        </div>
                        <div className="confirm-password">
                            <input type="password"
                                name="password2"
                                id="password2"
                                placeholder="password2"
                                value={password2}
                                onChange={this.handleChange} />
                        </div>
                        <div className="subnit-btn">
                            <button type="submit" className="submit-btn"> Submit</button>
                        </div>
                    </form>

                </div>

            </Fragment>
        )
    }
}
const mapStateToDispatch = {
    signUp
}
export default connect(null, mapStateToDispatch)(withRouter(SignUp));
