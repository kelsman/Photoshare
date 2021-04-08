import React, { useState, Fragment } from 'react';
import './style.scss';
import cogoToast from 'cogo-toast';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../../assets/default-avatar.png';
import * as Routes from '../routes';
import Loader from '../Loader';
import { BiHide, BiShowAlt } from 'react-icons/bi';

function ChangePasswordForm() {
  const user = useSelector(({ user }) => user.currentUser);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      await cogoToast.info('button has been clicked')
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="change__password__form__container">
      <form action="" onSubmit={handleSubmit} className="newPassword__form">
        <div className="profile__header">
          <img src={user ? user.avatar : Avatar} alt="" />

          <div className="profile__avatar__wrapper">
            <h4> {user && user.name}</h4>
          </div>

        </div>
        <div className="group__wrapper">
          <label htmlFor="oldPassword"> Old Password</label>

          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            // placeholder="old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />


        </div>

        <div className="group__wrapper">
          <label htmlFor="newPassword"> New Password</label>

          <input
            type="password"
            id="newPassword"
            name="newPassword"
            // placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />


        </div>
        <div className="group__wrapper">
          <label htmlFor="confirmPassword"> confirm Password</label>

          <input
            type="password"
            id="confirmPassword"
            name="confirmNewPassword"
            // placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

        </div>
        <div className="group__wrapper">
          <label htmlFor="submit__btn"></label>
          <button type="submit" id="submit__btn" style={{ width: "140px", height: "40px" }}>
            Change password
          {isLoading && <Loader />}
          </button>

        </div>
        {/*  <Link className="forgot__pasword__link">Forgot Password?</Link> */}
      </form>
    </div >
  );
}

export default ChangePasswordForm;
