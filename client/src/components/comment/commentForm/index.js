import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import './style.scss';
import { addComment } from '../../../redux/actions/post/post.actions';

const CommentForm = ({ postId, addComment }) => {

    const [text, setText] = useState('');


    return (
        <Fragment>
            <form className="post__commentBox" onSubmit={async (e) => {
                e.preventDefault();
                try {
                    await addComment(postId, { text });
                    setText('');
                    console.log('comment added')
                } catch (error) {
                    if (error) {
                        console.log(error.message)
                    }
                }

            }}>
                <input
                    className="post__input"
                    type="text"
                    placeholder="Add a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    disabled={!text ? true : false}
                    className="post__button"
                    type="submit"

                >
                    Post
          </button>
            </form>
        </Fragment>
    )
};

export default connect(null, { addComment })(CommentForm);