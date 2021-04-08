import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import NewPost from '../../component/NewPost/NewPost';
import * as Routes from '../../component/routes';

const NewPostPage = ({ location }) => {
  const history = useHistory();

  const {
    state: { fileSelected },
  } = location;

  return (
    <>
      {location.state && location.state.fileSelected ? (
        <NewPost file={fileSelected} />
      ) :
        history.goBack()
      }
    </>
  );
};

export default NewPostPage;
