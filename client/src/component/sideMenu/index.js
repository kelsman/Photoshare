import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'
import './style.scss';
import * as Icon from 'react-feather';

import { LogOut } from '../../redux/Actions/userActions';
//linebreak component
import { useHistory } from 'react-router-dom';
import * as Routes from '../routes';
const LineBreak = () => {

    return (
        <div style={{
            border: "1px solid lightgrey",
            height: "100%",
            width: "2px",
            opacity: .7
        }}>
        </div>
    )
}


const SideMenu = ({ user, isLoading, currentUser, LogOut }) => {


    const [defaultSelected, setdefaultSelected] = React.useState(true);
    const [clicked, setClicked] = useState(false)

    const history = useHistory();

    const handleLogOut = () => {
        LogOut(history);
    }

    return (
        <div className="wrapper">
            { !currentUser && <h1> Loading..</h1>}
            {
                currentUser && (
                    <Fragment>

                        <section className="header">
                            <h2> Photogram</h2>
                        </section>
                        <section className="user-avatar">
                            <img src={currentUser && currentUser.avatar} alt="avatar" />
                        </section>

                        <div className="user-info">
                            <h4 className="name">{currentUser.name}</h4>
                            <p className="username"> @{currentUser.username}</p>
                        </div>

                        <div className="post_info">

                            <div className="posts">
                                <h4> 40</h4>
                                <p> Posts</p>
                            </div>
                            <LineBreak />
                            <div className="followers">
                                <h4> 200</h4>
                                <p> Followers</p>
                            </div>
                            <LineBreak />
                            <div className="following">
                                <h4> 200</h4>
                                <p> Following</p>
                            </div>
                        </div>

                        <div className="menu-list">
                            <ul className="ul-list">
                                <li>
                                    <Icon.Menu className="menu-icon" color={defaultSelected ? "tomato" : "black"} />
                                    <h4> Feeds</h4>
                                </li>
                                <li onClick={() => {
                                    setClicked(true)
                                    history.push(Routes.Explore)
                                }}>
                                    <Icon.Search className="menu-icon" />
                                    <h4>Explore</h4>
                                </li>
                                <li onClick={handleLogOut}>
                                    <Icon.LogOut className="menu-icon" />
                                    <h4> Log out </h4>
                                </li>

                            </ul>
                        </div>

                    </Fragment>
                )
            }
        </div>
    )
};
const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
    isLoding: user.isLoading
});
export default connect(mapStateToProps, { LogOut })(SideMenu);