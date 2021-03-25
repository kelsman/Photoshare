import React, { useState } from 'react';

import './style.scss';
import { Switch, Route, NavLink, useRouteMatch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../../assets/default-avatar.png';
import * as Icon from 'react-feather';
import ChangePasswordForm from '../../component/changePasswordForm';
import EditProFileForm from '../../component/EditProfileForm';
import Footer from '../../component/Footer'

function EditProfilePage() {
    // useEffect(() => {

    // }, [window.outerWidth]);

    const user = useSelector(({ user }) => user.currentUser);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [bio, setBio] = useState('');


    const handleFormSubmit = (e) => {
        e.preventDefaut();
    };
    let { path, url } = useRouteMatch();
    return (
        <div className="Edit_wrapper">
            <div className="form_container">
                <div className="nav_links">
                    <ul>
                        <NavLink to={path} id="edit__profile__link">
                            <li>Edit Profile</li>
                        </NavLink>

                        <NavLink to={`${path}/Password`} id="change__password__link">
                            <li> Change password</li>
                        </NavLink>
                    </ul>
                </div>

                <div className="switch_container">
                    <Switch>
                        <Route exact path={path}>
                            <EditProFileForm />
                        </Route>
                        <Route exact path={`${path}/Password`} render={() => <ChangePasswordForm />} />
                    </Switch>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditProfilePage;
