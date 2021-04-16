import cogoToast from 'cogo-toast';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { forgetPassword } from '../../api/profile.api';
import './style.scss';

const ForgotPasswordScreen = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null)
    const handleSend = async (event) => {
        event.preventDefault()

        try {
            await forgetPassword({ email })
            setEmail('')
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="forgotpassword__wrapper">
            <h3> Forgot Your Password?</h3>
            <p> Enter your email address and we will send you instructions
            on how to reset your password
            </p>

            <form action="" style={{}} onSubmit={handleSend}>
                <div className="user-input-wrp">
                    <br />
                    <input
                        type="email"
                        name="email"
                        className="inputText"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="floating-label">Your email address</span>


                </div>
                {error && <span style={{ color: "red", margin: "10px 0px", display: "block" }}>{error}</span>}
                <button type="submit" onClick={handleSend}>Continue</button>
            </form>



            <small onClick={() => history.goBack()}> Back to my app</small>

        </div>
    )
}

export default ForgotPasswordScreen