import React, { useEffect } from 'react'
import './style.scss';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { loaduser } from '../../redux/Actions/userActions';

// import Header from '../../component/Header';
import SideMenu from '../../component/sideMenu';
import Menu from '../../component/MenuButtons';
import NavigationHeader from '../../component/NavigationHeader';
import SideBar from '../../component/SideBar';
import Cards from '../../component/Cards';

const token = localStorage.getItem('authToken');
const HomeScreen = ({ loaduser, currentUser }) => {


    const history = useHistory();

    useEffect(() => {
        let subscribe = true;
        if (subscribe) {
            loaduser(history)

        }
        return () => subscribe = null
    }, [])

    return (
        <div className="homeScreen">
            {/*  the navigation Header */}
            <NavigationHeader />
            {/* main */}
            <main>
                <div className="container">
                    <Cards />
                    <SideBar />
                </div>

            </main>

        </div>
    )

}

const mapStateToProps = ({ user }) => {
    return {
        currentUser: user.currentUser
    }
}

export default connect(mapStateToProps, { loaduser })(HomeScreen);