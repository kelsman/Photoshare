import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { loadUser } from '../../redux/actions/user/user.actions'

import './style.scss'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import SideMenu from '../../components/sideMenu';
import Main from '../../components/mainContent';

const PostsPage = ({ loadUser, User }) => {

    const [userLoaded, setUserLoaded] = useState(false)
    useEffect(() => {

        loadUser(setUserLoaded);



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadUser]);


    return (

        <Fragment>
            <div>



                {

                    userLoaded === true && User !== null ?

                        <div className="postPage-wrapper">

                            <SideMenu
                                username={User.username}
                                name={User.name}
                                followers={User.followedBy}
                                Following={User.followers}
                            />

                            <Main />

                        </div>

                        :
                        <div className="overlay">

                            <div
                                className="loader-container"
                            >
                                <Loader type="Circles" color="#00BFFF" height={100} width={100} />
                            </div>

                        </div>





                }



            </div>
        </Fragment>
    )
}


const mapStateToProps = ({ user }) => ({
    User: user.currentUser
});
const mapDispatchToProps = {
    loadUser
};
export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);