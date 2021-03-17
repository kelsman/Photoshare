
import React, { useEffect } from 'react';
import './style.scss';
import * as Icon from 'react-feather'

import { connect } from 'react-redux';

const ExploreCardMenu = ({ focus, likeFunc, userpost, user }) => {

    const [isLiked, setIsLiked] = React.useState(undefined)


    useEffect(() => {
        let sub = true;
        if (sub) {
            if (user && userpost && userpost.likes && userpost.likes.length) {
                const doesLiked = userpost.likes.find((like) => {
                    return like._user == user._id
                });
                if (doesLiked) {
                    setIsLiked(true)
                }
            }

        }
        return () => null;

    }, [likeFunc])



    return (
        <div className="cardMenu">
            <div className="interactions">

                <Icon.Heart
                    className="icon__heart" onClick={likeFunc} fill={isLiked ? 'tomato' : 'transparent'} />
                {/*   <Icon.ThumbsDown className="icon" onClick={unlikeFunc} /> */}
                <Icon.MessageCircle className="icon" onClick={focus} />
                <Icon.Share className="icon" />
            </div>
            <Icon.Bookmark className="icon" />
        </div>
    )
}

function mapStateToProps({ user }) {
    return {
        user: user.currentUser
    };
}
export default connect(mapStateToProps, null)(ExploreCardMenu);