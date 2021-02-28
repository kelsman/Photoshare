import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import './style.scss';
import { useHistory } from 'react-router-dom'

import SideMenu from '../../component/sideMenu';
import { loaduser } from '../../redux/Actions/userActions';


const token = localStorage.getItem('authToken');
const HomeScreen = ({ loaduser }) => {


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
            <SideMenu />
        </div>
    )

}

const mapStateToProps = ({ user }) => {
    return {
        currentUser: user.currentUser
    }
}

export default connect(mapStateToProps, { loaduser })(HomeScreen);