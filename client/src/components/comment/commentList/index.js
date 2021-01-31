import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';



function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
}



const CommentList = ({ postId, commentId, posts, comments }) => {

    const { text, date } = comments
    // eslint-disable-next-line no-unused-vars
    const [Comments, setComments] = useState(comments)
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