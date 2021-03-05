import React from 'react';
import Sticky from 'react-sticky-el';
import ProfileIcon from '../ProfileIcon';
import './style.scss';
import { connect } from 'react-redux';
import Suggestions from '../SuggestionsFollow';
import Footer from '../Footer';

const SideBar = ({ user }) => {
    return (
        <Sticky topOffset={-80}>
            <div className="sideBar">
                {/*  profile */}
                <div className="profile">
                    <ProfileIcon iconSize="big" />
                    <div className="text-container">
                        <span className="username">{user && user.username}</span>
                        <span className="name">{user && user.name}</span>
                    </div>
                </div>
                {/*  suggestions */}
                <Suggestions />

                {/* Footer */}
                <Footer />
            </div>
        </Sticky>
    )
};


const mapStateToProps = ({ user }) => {
    return {
        user: user.currentUser
    }
}
export default connect(mapStateToProps, null)(SideBar);