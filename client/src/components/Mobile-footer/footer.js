import React, { Fragment } from 'react'
import { AiFillHome } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs'
import { IconContext } from "react-icons";
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import './style.scss';
const Footer = () => {
    return (
        <Fragment>
            <div className="footer-wrapper">
                <div className="home">
                    <IconContext.Provider value={{ className: "home-icon" }}>
                        <AiFillHome size={"30px"} />
                    </IconContext.Provider>


                </div>
                <div className="search">
                    <IconContext.Provider value={{ className: "search-icon" }}>
                        <BsSearch size={"30px"} />
                    </IconContext.Provider>
                </div>
                <div className="newPost">
                    <IconContext.Provider value={{ className: "add-icon", style: { size: "20px" } }}>

                        <AiOutlinePlusCircle size={"30px"} />
                    </IconContext.Provider>
                </div>
                <div className="notification">
                    <IconContext.Provider value={{ className: "notofication-icon" }}>
                        <IoMdNotificationsOutline size={"30px"} />
                    </IconContext.Provider>
                </div>
                <div className="profile"></div>

            </div>

        </Fragment>
    )
};

export default Footer;