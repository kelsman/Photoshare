
import React, { Fragment } from 'react'
import './style.scss';

import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom';
import FollowButton from '../../FollowButton'
import Profile from '../../Profile';
import { v4 as uuidv4 } from 'uuid';
import * as Routes from '../../routes'
import HorizontalScroll from 'react-scroll-horizontal';
import Avatar from '../../../assets/default-avatar.png';

const SuggestionCard = () => {

    const queryClient = useQueryClient();
    const history = useHistory();
    if (!queryClient.getQueryData('fetchsuggestedusers')) {
        queryClient.invalidateQueries('fetchsuggestedusers')
    }
    const data = queryClient.getQueryData('fetchsuggestedusers');

    return (
        <Fragment>

            {

                queryClient.getQueryData('fetchsuggestedusers') ?
                    (
                        queryClient.getQueryData('fetchsuggestedusers').users.map((user) => (
                            <div key={uuidv4()} className="card__wrapper">
                                {/*  <Profile
                                    key={user._id}
                                    accountName={user.name}
                                    caption={user.username}
                                    userId={user._id}
                                    urlText="Follow"
                                    iconSize="medium"
                                    captionSize="small"
                                    storyBorder={true}
                                    image={user.avatar}
                                    authorUsername={user.username}
                                /> */}
                                <img src={user.avatar ? user.avatar : Avatar} alt="" onClick={() => history.push(Routes.ProfilePage + `/${user.username}`)} />
                                <h4>{user.username}</h4>
                                {user.bio && <p> {user.bio}</p>}
                                <FollowButton
                                    userId={user._id}
                                    avatar={user.avatar}
                                    username={user.username}
                                    following={false}
                                />
                            </div>


                        )

                        )

                    )
                    : null
            }

        </Fragment>

    )


}
export default SuggestionCard;