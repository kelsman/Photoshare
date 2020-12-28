import React from 'react';
import './style.scss';
//icons imports 
import { FaServer } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'
import { BsBellFill } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { IconContext } from "react-icons";
import { FiLogOut } from 'react-icons/fi'

const SideMenu = ({ username, followers, name, Fllowing }) => {
    return (
        <div className="sideMenu-Container">
            <section className="logo-section">
                <div className="logo-name">
                    <h3> Photogram</h3>

                </div>

            </section>
            <section className="profile-info">
                <div className="profile-img">

                    <img src="https://images.unsplash.com/photo-1601758123927-4f7acc7da589?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="profile" />
                </div>
                <div className="profile-names">
                    <p className="profileName"> {name}</p>
                    <p className="username"> @{username ? username : "kelsdman"}</p>
                </div>

            </section>
            <section className="post">
                <div className="posts">
                    <span> 46</span><span> Posts</span>
                </div>
                <div className="Followers"> <span>2.67k</span> <span>Followers</span> </div>
                <div className="Following">
                    <span>526</span><span>Following</span></div>
            </section>
            <section className="menu-list">
                <ul>

                    <li className="feeds">
                        <IconContext.Provider value={{ size: "1.3em", className: "icon" }}>
                            <div>
                                <FaServer />
                            </div>
                        </IconContext.Provider>
                        <span>Feed</span>
                    </li>
                    <li className="Explore">
                        <IconContext.Provider value={{ size: "1.3em", className: "icon" }}>
                            <div>
                                <BsSearch />
                            </div>
                        </IconContext.Provider>
                        <span>Explore</span>
                    </li>
                    <li className="notofications">
                        <IconContext.Provider value={{ size: "1.3em", className: "icon" }}>
                            <div>
                                <BsBellFill />
                            </div>
                        </IconContext.Provider>
                        <span>Notifications</span>
                    </li>
                    <li className="settings">
                        <IconContext.Provider value={{ size: "1.3em", className: "icon" }}>
                            <div>
                                <FiSettings />
                            </div>
                        </IconContext.Provider>
                        <span>Settings</span>
                    </li>


                    <div className="break"> </div>

                    <li className="logout">
                        <IconContext.Provider value={{ size: "1.3em", className: "icon" }}>
                            <div>
                                <FiLogOut />
                            </div>
                        </IconContext.Provider>
                        <span>Logout</span>
                    </li>
                </ul>
            </section>


        </div>
    )
};

export default SideMenu;