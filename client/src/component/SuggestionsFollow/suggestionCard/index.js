
import React, { Fragment } from 'react'
import './style.scss';

import { useQueryClient } from 'react-query'
import FollowButton from '../../FollowButton'
import Profile from '../../Profile';
import { v4 as uuidv4 } from 'uuid';
const SuggestionCard = () => {

    const queryClient = useQueryClient();

    if (!queryClient.getQueryData('fetchsuggestedusers')) {
        queryClient.invalidateQueries('fetchsuggestedusers')
    }
    const data = queryClient.getQueryData('fetchsuggestedusers');

    return (
        <Fragment>
            {
                queryClient.getQueryData('fetchsuggestedusers') ?
                    (


                        data.users.map((user) => (

                            <div key={uuidv4()} className="card__wrapper">
                                <Profile
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
                                />
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