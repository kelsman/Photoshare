import React, { Fragment, useState } from 'react';
import './style.scss';
import axios from 'axios';

const MainPage = () => {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState('')
    const [fileData, setFileData] = useState('')
    const handlechange = async ({ target }) => {
        setCaption(target.value)


    };
    const handlefileChange = ({ target }) => {

        setFileData(target.files[0])
    }
    // const handleImageChange = (e) => {
    //     setImage(e.target.files)
    //     console.log(e.target.files)
    // }
    const handleSubimit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("image", fileData);
            setImage(e.target.files)
            const config = {
                "Content-Type": "multipart/form-data",
                "x-auth-token": "x-auth-token"
            }
            const res = await axios.post('/api/route/post', config, formData);
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <Fragment>
            <div>
                <form onSubmit={handleSubimit} action="/api/route/post" method="post" encType="multipart/form-data"></form>
                <input type="textarea" rows="4" col="5" name="caption" placeholder="caption" value={caption} onChange={handlechange} />
                <input type='file' name="image" value={image} onChange={handlefileChange} />
                <button type="submit"> submit</button>
            </div>

        </Fragment>
    )
};

export default MainPage;