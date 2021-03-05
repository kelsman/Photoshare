import React, { useState } from 'react';
import './style.scss';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin, loaduser } from '../../../redux/Actions/userActions'
// import { Formik } from 'formik';
import { useFormik } from 'formik'
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import { IconContext } from "react-icons";
// import cogoToast from 'cogo-toast';

// Routes 
import * as Routes from '../../routes';

import { useHistory } from 'react-router-dom';




const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('please provide a valid email'),
    password: Yup.string().required(`password can't be empty`)
});
const LogInForm = ({ signin }) => {

    const history = useHistory();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (values) => {
        try {
            setIsSubmitting(true)
            await signin(values, history);
            setIsSubmitting(false)
            // history.push(Routes.Dashboard);

        } catch (error) {
            console.log(error.message);
            values.email = "";
            values.password = ""
        }

    }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: handleFormSubmit

    })


    const { values, errors, handleChange, handleSubmit } = formik
    return (

        <div>
            {/* <h1 className="logo">Photogram</h1> */}
            <form onSubmit={handleSubmit} className="login-form">
                <h2> Log in</h2>
                <div>
                    <div className="email-container">
                        <IconContext.Provider value={{ className: "react-icons" }}>
                            <AiOutlineMail />
                        </IconContext.Provider>
                        <input
                            className="email-input"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={handleChange}
                            placeholder="email"
                        />
                    </div>
                    {errors.email && <small className="error" style={{ color: "red", opacity: .7 }}> {errors.email}</small>}
                </div>
                <div>
                    <div className="password-container">
                        <IconContext.Provider value={{ className: "react-icons" }}>
                            <AiOutlineLock />
                        </IconContext.Provider>
                        <input
                            className="password-input"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="password"
                        />


                    </div>
                    {errors.password && <small className="error" style={{ color: "red", opacity: .7 }}> {errors.password}</small>}


                </div>
                <Link className="password-reset-link reset-password" to="/accounts/password/reset">Forgot your password? </Link>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting ? true : false}>
                    {isSubmitting ? "Signing in.." : "Log in"}
                </button>



            </form>
            <p> Don't have an account? <Link className="password-reset-link" to="/accounts/signup"> Sign up</Link></p>



        </div>
    )
};
const mapStateToProps = ({ user }) => {
    return {
        loadUserErrorr: user.authError.loadUserError
    }
}
export default connect(mapStateToProps, { signin, loaduser })(LogInForm);

