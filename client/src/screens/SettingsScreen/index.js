import React, { useState } from 'react';
import './style.scss';
// components
import Avatar from '../../assets/default-avatar.png';
import * as Icon from 'react-feather';
import ChangePasswordForm from '../../component/changePasswordForm';
import EditProFileForm from '../../component/EditProfileForm';
import Footer from '../../component/Footer'

// External Libraries

import { Switch, Route, NavLink, useRouteMatch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
        <div className="settings__page">

            <div className="settings__page__forms__wrapper">

                <ul className="navlink__sidebar">
                    <NavLink to={path}
                        className="sidebar__link"
                        activeClassName="sidebar__link--active"
                    >
                        <li className="sidebar__link__text">Edit Profile</li>
                    </NavLink>

                    <NavLink
                        to={`${path}/Password`}
                        className="sidebar__link"
                        activeClassName="sidebar__link--active"
                    >
                        <li className='sidebar__link__text' > Change password</li>
                    </NavLink>
                </ul>


                <article className="settings__page__content">
                    <Switch>
                        <Route exact path={path}>
                            <EditProFileForm />
                        </Route>
                        <Route exact path={`${path}/password`} render={() => <ChangePasswordForm />} />
                    </Switch>
                </article>
            </div>
            {/*  <Footer /> */}
        </div>
    );
}

export default EditProfilePage;
