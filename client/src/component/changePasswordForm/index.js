import React, { useState, Fragment } from 'react';
import './style.scss';
import cogoToast from 'cogo-toast';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../../assets/default-avatar.png';
import * as Routes from '../routes';
import Loader from '../Loader';
import { BiHide, BiShowAlt } from 'react-icons/bi';
import MobileHeader from '../NavigationHeader/MobileHeader';
import { changePassword } from '../../api/profile.api';


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
      if (newPassword !== confirmNewPassword) {
        return cogoToast.info('password do not match')
      }
      setIsLoading(true)
      await changePassword({ oldPassword, newPassword, confirmNewPassword })
      setOldPassword('')
      setNewPassword('');
      setConfirmNewPassword('')
      setIsLoading(false)
    } catch (error) {

      console.log(error.msg);
      setOldPassword('')
      setNewPassword('');
      setConfirmNewPassword('')
    }
  };
  return (

    <div className="change__password__form__container">
      <MobileHeader backArrow>
        <h5 style={{ textAlign: "center" }}> Change Password</h5>
      </MobileHeader>
      <form action="" method="put" onSubmit={handleSubmit} className="newPassword__form">
        <div className="profile__header">
          <img src={user ? user.avatar : Avatar} alt="" />
          <div className="profile__avatar__wrapper">
            <h4> {user && user.name}</h4>
          </div>
        </div>

        <div className="group__wrapper">
          <label> Old Password</label>
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
          <label> New Password</label>

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
          <label> Confirm Password</label>

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
          <label></label>
          <button type="submit" id="submit__btn" style={{ height: "2rem", position: "relative" }}>
            Change password
          {isLoading && <Loader />}
          </button>

        </div>
        {/*  <Link className="forgot__pasword__link">Forgot Password?</Link> */}
      </form>
    </div>
  );
}

export default ChangePasswordForm;
