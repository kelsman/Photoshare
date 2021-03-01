import React from 'react';
import styled from 'styled-components'
import * as Icon from 'react-feather';

const Wrapper = styled.div`
    /* width:  270px; */
    min-height: 200px;
    max-height: 400px;
`
const PostMedia = styled.embed`
max-width: 100%;
min-height: inherit;
max-height: inherit;
object-fit: cover;
border-radius: 15px;
&:focus{
    outline: 0;
}

`
const BottomWrapper = styled.div`
min-width: 100%;
max-width: 300px;
display: flex;
justify-content: space-between;
align-items: center;
/* height: 5vh; */

`
const PosterAvatar = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border-radius:50%;

`


const styles = {
    postAvatarContainer: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "1.3px solid tomato",
        padding: '3px',
    },
    bottomLeft: {
        display: "flex",
        alignItems: "center",

    },
    bottomRight: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"

    },
    icon: {
        fontWeight: "200",
        fontSize: "20px"
    }
}

function PostCard({ key, date, media, likes, comments, postedBy }) {
    return (
        <Wrapper>
            <PostMedia alt="post image" src={media} height="300px" autoplay />
            <BottomWrapper>
                <div style={styles.bottomLeft}>
                    <div style={styles.postAvatarContainer}>
                        <PosterAvatar src={postedBy.avatar} alt="poster img" />
                    </div>
                    <h2 style={{ fontSize: "smaller", margin: "0 4px" }}>{postedBy.username}</h2>
                </div>
                <div style={styles.bottomRight}>
                    <p style={{ margin: "0 3px" }}>
                        <Icon.MessageCircle className="icon" />  {comments.length ? comments.length : 0}
                    </p>
                    <p style={{ margin: "0 3px" }}> <Icon.Heart className="icon" /> {likes.length ? likes.length : 0}</p>
                </div>
            </BottomWrapper>
        </Wrapper>
    )
}

export default PostCard
