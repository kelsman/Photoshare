import React from 'react';
import './style.scss';
import CommentList from '../../CommentList'
import CardMenu from '../CardMenu'
import { ReactComponent as CardButton } from '../../../assets/cardButton.svg';
import Profile from '../../Profile';
import moment from 'moment';


const ExploreMobileCard = (props) => {

    const { likes, comments, date, image, storyBorder, postedBy } = props;
    const [commentText, setCommentText] = React.useState('');

    return (
        <div className="card">
            <header>
                <Profile username={postedBy.username} iconSize="medium" storyBorder={storyBorder} />
                <CardButton className="cardButton" />
            </header>
            <img className="cardImage" src={image} alt="card content" />
            <CardMenu />
            <div className="likedBy">
                {/* <Profile iconSize="small" hideAccountName={true} /> */}
                {!likes.length ?
                    <small className="like-title"> Be the first to <b>like this</b></small>
                    :
                    <small>{likes.length} Likes</small>
                }
            </div>
            <div className="comments">
                {comments.map((comment) => {
                    return (
                        <CommentList

                            key={comment._id}
                            accountName={comment.name}
                            comment={comment.text}
                            commentImage={comment.avatar}
                            commentTime={comment.date}
                        />
                    );
                })}
            </div>
            <div className="timePosted"> {moment(date).format('MMM D')}</div>
            <form className="newComment" onSubmit={(e) => e.preventDefault()}>
                <input value={commentText} onChange={(e) => setCommentText(e.target.value)} type="text" placeholder="Add a comment..." className="commentText" />
                <button className="postText-btn">Post</button>
            </form>
        </div>
    )
};

export default ExploreMobileCard;