import { Fragment, useState } from 'react';
import { resetPassword } from '../../api/profile.api';
import { useParams } from 'react-router-dom';


import './style.scss'

const ResetPasswordScreen = () => {

    const [newPassword, setNewPassword] = useState('');
    const { resetToken } = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword(resetToken, { newPassword });
        setNewPassword('')

    }
    return (
        <div className="main__div">

            <div className="password__card">
                <form action="" method="put" onSubmit={handleSubmit}>
                    <h5>Reset Password</h5>
                    <input
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <button type="submit"> Submit</button>
                </form>

            </div>



        </div>

    )
}

export default ResetPasswordScreen;