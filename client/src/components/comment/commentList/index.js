import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';



function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
}



const CommentList = ({ postId, commentId, posts, comments }) => {

    const { _id, text, User, date } = comments
    console.log(comments.text)
    return (
        <Fragment >

            <div key={commentId}>

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