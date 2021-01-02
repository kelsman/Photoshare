import React, { useState, useEffect, Fragment } from 'react';
import './style.scss';
import { connect } from 'react-redux';
import { loadUser } from '../../redux/actions/user/user.actions'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import SideMenu from '../../components/sideMenu';
import Main from '../../components/mainContent';


const MainPage = ({ loadUser, currentUser }) => {
    const [userisLoading, setUserIsLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {

            try {
                await loadUser(setUserIsLoading);

            } catch (error) {
                console.log(error);
            }


        };
        fetchUser();
    }, [loadUser])


    return (
        <div className="main-page">


            {
                userisLoading ? (
                    <div className="loader-wrapper">
                        <Loader type="Circles" color="#A75327" height={80} width={80} />
                    </div>
                ) :
                    (
                        <Fragment>

                            <SideMenu user={currentUser} />
                            <Main />
                        </Fragment>
                    )

            }





        </div>
    )
};
const mapDispatchToProps = {
    loadUser
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

