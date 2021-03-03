import React from 'react';
import './style.scss'
import * as Icon from 'react-feather';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as Routes from '../routes'
const Wrapper = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-around;
background-color: #FFFFFF;
position: fixed;
z-index: 4;
bottom: 0;
left: 0;
 right: 0;
height: 50px;


`



const MobileTabMenu = ({ user, }) => {

    const history = useHistory();
    console.log(history);
    const { location } = history;
    return (
        <Wrapper>
            <Link to={Routes.Dashboard}>
                <Icon.Home size={26} />
            </Link>
            <Link to={Routes.Explore}>
                <Icon.Search className="icon__search" size={26} />
            </Link>

            <Icon.PlusCircle className="icon__plus" size={26} />
            <Icon.Heart className="icon__heart" fill={"black"} size={26} />

            {user && user.avatar && (
                <img src={user.avatar} alt="avatar" width="26px" height="26px" />
            )}

        </Wrapper>
    )
}

const mapStateTOProps = ({ user }) => ({
    user: user.currentUser
})
export default connect(mapStateTOProps)(MobileTabMenu);