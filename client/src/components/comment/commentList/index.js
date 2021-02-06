import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import Avatar from '../../../assets/images/Avatar.png'
import './style.scss';


function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
}



const CommentList = ({ commentId, comments, }) => {

    const { text, date, authorId, authorName, authorPicture, } = comments
    // const { username, dipslayPicture } = a
    // // eslint-disable-next-line no-unused-vars

    return (
        <Fragment >

            <div key={commentId} className="comment-wrapper">
                <img
                    src={authorPicture ? authorPicture : Avatar}
                    alt="profile" />
                <p> {authorName}</p>
                <p>
                    {text}
                    <span>
                        posted on {formatDate(date)}
                    </span>
                </p>




            </div>
        </Fragment>



    )
};

const mapStateToProps = ({ post, user }) => {
    return {
        posts: post.posts,
        postLoading: post.loading,
        user: user.currentUser

    }
}

export default connect(mapStateToProps)(CommentList);