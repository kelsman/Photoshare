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

            <Media
                alt=""
                src={post.postMedia}
                onClick={() => history.push(Routes.PostPage + `/${post._id}`, { post })}
            />

        </React.Fragment>
    )
}

export default PostCard;
