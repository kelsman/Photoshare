import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import * as Routes from '../../routes';
import { showModal, hideModal } from '../../../redux/modal/modalActions';
import { useHistory } from 'react-router-dom';
// import { createPostFunc } from '../../../redux/Actions/postActions';
import Loader from '../../Loader'
import * as Icon from 'react-feather';
import cogoToast from 'cogo-toast';
// react-query
import { useQuery, useQueryClient, useMutation } from 'react-query';
// api
import { createPost } from '../../../api/posts.api';

// modal
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const NewPostModal = ({ file }) => {
  const modalIsOpen = useSelector(({ modal }) => modal.showModal);
  const dispatch = useDispatch();
  const history = useHistory();
  const [previewImage, setPreviewImage] = useState(undefined);
  const [caption, setCaption] = useState('');
  const queryClient = useQueryClient()

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
    history.goBack();
  };


  const mutatePost = useMutation(async () => {
    // cogoToast.loading('posting')
    const data = await new FormData();
    data.append('postfile', file);
    data.append('caption', caption);
    await createPost(data, history)
  },
    {

      onSuccess: async () => {
        queryClient.invalidateQueries('feedsData')
        cogoToast.success('post created')

      },
      onError: (err) => {
        console.log(err)
      }
    })



  return (
    <div className="modal__wrapper">
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        overlayClassName="overlay"
        showCloseIcon={false}
        blockScroll
        center
        focusTrapped
        classNames={
          {
            overlay: 'newPostoverlay',
            modal: 'newPostModal',
          }
        }
      >
        <div className="modal__header">
          <button className="goback__btn" onClick={closeModal}>
            <Icon.ArrowLeft />
          </button>
          <button className="share__btn" type="submit" onClick={mutatePost.mutateAsync}>
            {' '}
            Share
          </button>
        </div>
        <small> New Post</small>
        {/* caption */}
        <input
          placeholder=" Add a Caption"
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
          <Fragment>
            <div className="preview__wrapper">

              <img src={previewImage} className="preview" alt="image" />

            </div>
          </Fragment>
        )}
        {mutatePost.isLoading && <Loader />}
      </Modal>
    </div>
  );
};

export default NewPostModal;
