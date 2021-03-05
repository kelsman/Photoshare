import React, { useState } from 'react'
import './style.scss';
import { ReactComponent as CardButton } from '../../../assets/cardButton.svg'
import CardMenu from '../CardMenu';
import CommentList from '../../CommentList';
import Profile from '../../Profile';


function Card(props) {
    const [commentText, setCommentText] = useState('');

    const { storyBorder,
        image,
        comments,
        likedByText,
        likedByNumber,
        hours, } = props;
    return (
        <div className="card">
            <header>
                <Profile iconSize="medium" storyBorder={storyBorder} />
                <CardButton className="cardButton" />
            </header>
            <img className="cardImage" src={image} alt="card content" />
            <CardMenu />
            <div className="likedBy">
                <Profile iconSize="small" hideAccountName={true} />
                <span>
                    Liked by <strong>{likedByText}</strong> and{" "}
                    <strong>{likedByNumber} others</strong>
                </span>
            </div>
            <div className="comments">
                {comments.map((comment) => {
                    return (
                        <CommentList
                            key={comment.id}
                            accountName={comment.user}
                            comment={comment.text}
                        />
                    );
                })}
            </div>
            <div className="timePosted">{hours} HOURS AGO</div>
            <div className="addComment">
                <input value={commentText} onChange={(e) => setCommentText(e.target.value)} type="text" placeholder="Add a comment..." className="commentText" />
                <button className="postText-btn">Post</button>
            </div>
        </div>
    )
}

export default Card
