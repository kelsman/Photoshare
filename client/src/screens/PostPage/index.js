import React from 'react'
import './style.scss';
import { useHistory } from 'react-router-dom';

// componnets
import NavigationHeader from '../../component/NavigationHeader';
import CommentList from '../../component/CommentList';
import Profile from '../../component/Profile';
import CardMenu from '../../component/Cards/CardMenu';
import MobileTabMenu from '../../component/MobileTabMenu';
import Card from '../../component/Cards/Card'
// external liberires
import * as Icon from 'react-feather'
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import ExploreMobileCard from '../../component/Cards/ExploreCard';

function PostPage() {

    const history = useHistory();

    const [commentText, setCommentText] = React.useState('');

    const [post, setPost] = React.useState(history.location.state.post)


    console.log(post);
    const { location: { pathname, state } } = history;
    const { avatar, postedBy, likes, date, postMedia, comments } = post;

    return (
        <div className="post-page">
            <header>
                <NavigationHeader />
            </header>

            <main>
                <div className="post_content">

                    <div className="post_image">
                        <img src={postMedia} alt="image" />
                    </div>



                    <div className="post_details">
                        <div className="profile">
                            <Profile image={postedBy.avatar} iconSize="medium" username={postedBy.username} />
                            <Icon.MoreHorizontal className="more-icon" size={26} />
                        </div>

                        {/* comment section */}
                        <div className="comment-section">
                            {comments.map((comment) => (
                                <CommentList
                                    key={uuidv4()}
                                    accountName={comment.name}
                                    comment={comment.text}
                                    commentImage={comment.avatar}
                                    commentTime={comment.date}
                                />
                            ))}

                        </div>

                        {/* icons*/}
                        <div className="card_icon_menu">
                            <div className="card-menu">
                                <CardMenu />
                            </div>
                            {!likes.length ?
                                <small className="like-title"> Be the first to <b>like this</b></small>
                                :
                                <small>{likes.length} Likes</small>
                            }


                            <small className="post-date">
                                {
                                    moment(date).format('MMM D')
                                }
                            </small>
                        </div>

                        {/*  add a comment form */}
                        <form className="addComment" onSubmit={(e) => e.preventDefault()}>
                            <input value={commentText} onChange={(e) => setCommentText(e.target.value)} type="text" placeholder="Add a comment..." className="commentText" />
                            <button type="submit" className="postText-btn">Post</button>
                        </form>

                    </div>

                </div>
                <div className="mobile_post_content">
                    <ExploreMobileCard
                        likes={likes}
                        comments={comments}
                        image={postMedia}
                        postedBy={postedBy}
                    />
                </div>

            </main>

        </div>
    )
}

export default PostPage
//  image,
// comments,
// likedByText,
// likedByNumber,
// hours




