import React, { useState } from 'react';
// import { BsBellFill } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BsSearch } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IconContext } from "react-icons";
import './style.scss';


const Main = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className="main-container">

            <section className="topNav">
                <div className="search-component">
                    <IconContext.Provider value={{ className: "searchIcon", style: { color: "#fff", size: "1.3em", verticalAlign: "center" } }}>
                        <BsSearch />
                    </IconContext.Provider>
                    <input type="text" className="search" placeholder="search" onChange={handleSearchChange} name="search" value={searchValue} />
                </div>
                <div className="other-side">
                    <IconContext.Provider value={{ className: "notification-icon" }}>

                        <IoMdNotificationsOutline />
                    </IconContext.Provider>


                    <div className="addphoto">
                        <IconContext.Provider value={{ className: "add-icon" }}>

                            <AiOutlinePlusCircle />

                        </IconContext.Provider>
                        <span>Add Photo</span>
                    </div>
                </div>
            </section>


        </div>
    )
};

export default Main;
