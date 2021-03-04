import React from 'react';
import styled from 'styled-components'
import * as Icon from 'react-feather';

import { useHistory, Link } from 'react-router-dom';
import * as Routes from '../../component/routes';


const Media = styled.embed`
width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;

  
`

function PostCard({ post }) {

    const history = useHistory();
    return (
        <React.Fragment >

            <Media alt="" src={post.postMedia} onClick={() => history.push(Routes.PostPage + `/${post._id}`, { post })} />


            {/*     <BottomWrapper>
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
            </BottomWrapper> */}
        </React.Fragment>
    )
}

export default PostCard;
