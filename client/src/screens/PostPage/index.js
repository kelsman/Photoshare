import React from 'react'
import './style.scss'

import { useHistory } from 'react-router-dom';
import Header from '../../component/Header';
import * as Icon from 'react-feather'

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import MobileTabMenu from '../../component/MobileTabMenu';

function PostPage() {
    const history = useHistory();
    const [comment, setComment] = React.useState('');

    const [post, setPost] = React.useState(history.location.state.post)


    console.log(post);
    const { location: { pathname, state } } = history;
    const { avatar, postedBy, likes, date, postMedia, comments } = post;

    return (
        <div className="post-page">
            <section className="header">
                <Header />
            </section>
            {/* mobile header */}
            <section className="mobile_header">
                <button onClick={() => history.goBack()}>
                    <Icon.ArrowLeft size={25} />

                </button>
                <h4> Post</h4>
            </section>
            {/* end of mobile header */}
            <section className="main">
                <div className="mobile_post_header">
                    <div className="poster">

                        <img src={postedBy.avatar} alt="" />
                        <div className="right">
                            <p>{postedBy.username}</p>
                            <Icon.MoreVertical onClick={() => console.log('clicked')} />
                        </div>
                    </div>
                </div>
                <div className="image-wrapper">
                    <img src={postMedia} alt="image" />
                </div>
                {/*  post owner details */}
                <div className="post_details">
                    <div className="poster">
                        <section className="left">
                            <img src={postedBy.avatar} alt="" />
                            <p>{postedBy.username}</p>
                        </section>
                        <section className="right">
                            <Icon.MoreVertical />
                        </section>
                    </div>
                    {/* end of  post owner details */}
                    {/* comment section */}
                    <div className="comment-section">
                        {
                            comments && comments.length && comments.map((comment) => (
                                <div key={uuidv4()} className="poster_container">
                                    <div className="comment-section_poster">
                                        <img src={postedBy.avatar} alt="" />
                                        <p className="comment_name" >{comment.name}</p>
                                        <p className="comment_text" > {comment.text}</p>
                                    </div>

                                    <small className="comment_date">
                                        {moment(comment.date).fromNow()}
                                    </small>
                                </div>
                            ))
                        }
                    </div>
                    {/* like icon and like count section */}
                    <div className="icons">
                        <section className="icon_section">

                            <Icon.Heart className="icon_section_icon" />

                            <Icon.MessageCircle className="icon_section_icon" />
                        </section>
                        {likes && likes.length ?
                            <p className="like_count"> {likes.length}likes</p>
                            : <p className="like_count">Be the first to <b>Like this</b></p>
                        }
                        <p className="post_date">{moment(date).format('MMMM DD')}</p>

                    </div>
                    {/* mobile screen comments section */}
                    <div className="mobile_comment-section">
                        {
                            comments && comments.length && comments.map((comment) => (
                                <div key={uuidv4()} className="poster_container">
                                    <div className="comment-section_poster">
                                        <img src={postedBy.avatar} alt="" />
                                        <p className="comment_name" >{comment.name}</p>
                                        <p className="comment_text" > {comment.text}</p>
                                    </div>

                                    <small className="comment_date">
                                        {moment(comment.date).fromNow()}
                                    </small>
                                </div>
                            ))
                        }
                    </div>
                    {/* end of mobile screen comment section */}
                    <div className="new_post_comment">
                        <form onSubmit={(event) => event.preventDefault()}>
                            <input

                                placeholder="Add a comment"
                                type="text"
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button disabled={!comment ? true : false} type="submit" className="post-btn">
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <div className="mobile_tab_menu">
                <MobileTabMenu />

            </div>

        </div>
    )
}

export default PostPage





