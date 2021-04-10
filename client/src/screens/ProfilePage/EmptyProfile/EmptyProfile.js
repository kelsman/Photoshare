import React, { Fragment } from 'react'
import './style.scss';
import * as Icon from 'react-feather';
import NewPostButton from '../../../component/NewPost/NewPostButton';
import { useSelector } from 'react-redux';


const EmptyProfile = ({ username, currentUserProfile }) => {
    return (

        <div className="Empty_profile_container">
            <Icon.Camera size={40} />
            {currentUserProfile ? (
                <Fragment>
                    <h1>Share Photos</h1>
                    <h3>
                        When you share photos, they will appear on your profile.
                     </h3>
                    <NewPostButton style={{ color: "blue", fontSize: "20px" }} iconName="Post" />
                </Fragment>
            ) : (
                <Fragment>
                    <h1 >No Posts Yet</h1>
                    <h3 >
                        When {username} posts, you'll see their photos here.
                     </h3>
                </Fragment>
            )}
        </div>



    )
}

export default EmptyProfile;