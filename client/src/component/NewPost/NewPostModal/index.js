import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import * as Routes from '../../routes';
import { showModal, hideModal } from '../../../redux/modal/modalActions';
import { useHistory } from 'react-router-dom';
import { createPostFunc } from '../../../redux/Actions/postActions';

import * as Icon from 'react-feather';
import cogoToast from 'cogo-toast';

const NewPostModal = ({ file }) => {
  const modalIsOpen = useSelector(({ modal }) => modal.showModal);
  const dispatch = useDispatch();
  const history = useHistory();
  const [previewImage, setPreviewImage] = useState(undefined);
  const [caption, setCaption] = useState('');

  // console.log(file)

  useEffect(() => {
    dispatch(showModal());
    return () => null;
  }, []);

  useEffect(() => {
    if (file.type == 'image/jpeg' || file.type == 'image/png') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
    } else {
      //
    }
    return () => null;
  }, [file]);

  const closeModal = async () => {
    dispatch(hideModal());
    history.push(Routes.Dashboard);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {

      const data = await new FormData();
      data.append('postfile', file);
      data.append('caption', caption);
      console.log(data.get('postfile'), data.get('caption'));
      await dispatch(createPostFunc(data, history));
      history.push(Routes.Dashboard);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="modal__wrapper">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal__header">
          <button className="goback__btn" onClick={closeModal}>
            <Icon.ArrowLeft />
          </button>
          <button className="share__btn" type="submit" onClick={handlePost}>
            {' '}
            Share
          </button>
        </div>
        <small> New Post</small>
        {/* caption */}
        <input
          placeholder=" write a Caption"
          className="caption__box"
          name="caption"
          id="caption"
          type="text"
          style={{ resize: 'none' }}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        {/* preview image */}

        {previewImage && (
          <div className="preview__wrapper">
            <img src={previewImage} className="preview" alt="image" />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NewPostModal;
