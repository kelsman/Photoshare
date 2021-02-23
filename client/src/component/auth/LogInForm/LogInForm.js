import React, { useState } from 'react';
import './style.scss';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

// import { Formik } from 'formik';
import { useFormik } from 'formik'
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import { IconContext } from "react-icons";



const validationSchema = Yup.object().shape({
    email: Yup.string().email().min(5).required('please provide a valid email'),
    password: Yup.string().min(6, 'password must have at least 6 characters').required()
});


const LogInForm = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            await setIsSubmitting(true)
            // await alert(JSON.stringify(values, null, 2));
            // setIsSubmitting(false)
        }

    })


    const { values, errors, handleChange, handleSubmit } = formik
    return (

        <div>
            <h1 className="logo">Photogram</h1>

            <form onSubmit={handleSubmit} className="login-form">
                <h2> Log in</h2>
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
                {errors.email && <small style={{ color: "red", opacity: .7 }}> {errors.email}</small>}

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

                {errors.password && <small style={{ color: "red", opacity: .7 }}> {errors.password}</small>}
                <Link className="password-reset-link" to="/accounts/password/reset">Forgot your password? </Link>

                <button type="submit" className="submit-btn">
                    Log in
                    </button>



            </form>
            <p> Don't have an account? <Link className="password-reset-link" to="/accounts/signup"> Sign up</Link></p>



        </div>
    )
};
export default LogInForm;

