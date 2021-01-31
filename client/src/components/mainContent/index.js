import React, { useState, useEffect } from 'react';
// import { BsBellFill } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BsSearch } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IconContext } from "react-icons";
import './style.scss';
import Feeds from '../feeds';
import Modal from 'react-modal';
import { ToastContainer} from 'react-toastify';
import { createPost, getComments, getposts } from '../../redux/actions/post/post.actions'
import { connect} from 'react-redux';
import { withRouter} from 'react-router-dom';

const Main = ({history, createPost, getposts, getComments}) => {

    const [searchValue, setSearchValue] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [redirect, setRedirect] = useState(false);
   
    const [ fileSelected, setFileSelected] = useState(null)
    const [caption, setCaption] = useState('')

    useEffect(() => {

        let isSubscribed = true;
        const fetchData= async ()=> {
            await getposts()
            await getComments()
        }
        if (isSubscribed) {
          fetchData()        
        }

        return () => isSubscribed = false;
   
    }, []);

    // useEffect(() => {

    //       let isSubscribed = true;
    //     if (isSubscribed) {
    //         getComments()
       
    //     }
    //     return () => isSubscribed = false;
    
    // }, [getComments])

    


    function handleSearchChange(e) {
        setSearchValue(e.target.value);
    }

    const handleAddBtn = async () => {

        await setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    }
  
   const handleFileChange = async (event)=> {
      
      await setFileSelected(event.target.files[0]);
        console.log(fileSelected);
     
   }

    const handleFormSubmit = async (e)=> {
        e.preventDefault();
        
        if(!fileSelected){
            alert('select a file ')
        }
        const data =  new FormData();
        await  data.append("caption", caption);
         await   data.append('image', fileSelected);
      
        
      try {
          await createPost(data);
         await setRedirect(true)
          window.location.reload();
      } catch (error) {
          console.log(error);
      }

      


    }
   

    return (
        <div className="main-container">

            <section className="topNav">
                <div className="search-component">
                    <IconContext.Provider value={{ className: "searchIcon", style: { color: "#fff", size: "1.3em", verticalAlign: "center" } }}>
                        <BsSearch />
                    </IconContext.Provider>
                    <input type="text" className="search" placeholder="search" onChange={handleSearchChange} name="search" value={searchValue} />
                </div>
                <div className="other-side">
                    <IconContext.Provider value={{ className: "notification-icon" }}>

                        <IoMdNotificationsOutline />
                    </IconContext.Provider>


                    <div className="addphoto" onClick={handleAddBtn}>
                        <IconContext.Provider value={{ className: "add-icon" }}>

                            <AiOutlinePlusCircle />

                        </IconContext.Provider>
                        <span>Add Photo</span>
                    </div>
                </div>
            </section>

            <section className="feeds-section">
                <h4>Feed</h4>
                <Feeds />

            </section>

            <div className="addPost-modal">

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <button 
                    className="closemodal-btn"
                    onClick = {()=> setIsOpen(false)}>
                    close
                    
                    </button>
                   <div className="createPost-form">
                    <form 
                        action="/api/route/post" 
                        method="post" 
                    encType="multipart/form-data"
                    onSubmit={handleFormSubmit} >
                    <div className="caption">
                    <input
                     type="text" 
                     placeholder="Caption"
                      name="caption" 
                      value={caption}  
                      onChange={(e)=> setCaption(e.target.value)}
                      />
                    </div>
                    <div className="file-input">
                    <span>Uplaod Image</span>
                    <input 
                    type='file' 
                    name="image"
                    placeholder="select image to upload"
                    onChange={handleFileChange}
                    />
    
                    </div>
                    <input type="submit" value="Post" />
                    </form>

                   
                   </div>
                </Modal>
            </div>

            <ToastContainer/>
        </div>
    )
};

export default connect(null, {createPost, getposts, getComments})(withRouter(Main));
