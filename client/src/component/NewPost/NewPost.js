import React from 'react';
import NewPostModal from './NewPostModal';

function NewPost({ file }) {
  return (
    <div>
      <NewPostModal file={file} />
    </div>
  );
}

export default NewPost;
