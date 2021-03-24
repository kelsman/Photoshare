import socketTypes from './Socket/socketTypes';

export const updateComment = (post, payload) => {
  const { comments } = post;
  comments = [payload, ...comments];

  return comments;
};
