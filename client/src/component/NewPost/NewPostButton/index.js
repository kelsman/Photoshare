import React, { useState, Fragment, useEffect, useRef } from 'react'
import * as Icon from 'react-feather';
import { useHistory } from 'react-router-dom'
import './style.scss'
import * as Routes from '../../routes'

const NewPostButton = ({ iconName, children }) => {

    const history = useHistory();
    const [fileSelected, setFileSelected] = useState(undefined);
    const fileinput = useRef()

    useEffect(() => {
        if (fileSelected) {
            history.push(Routes.NewPostPage, { fileSelected })

            fileinput.current.value = ""
        }
        return () => null
    }, [fileSelected])

    console.log(fileSelected)
    return (

        <Fragment>
            <form encType="multipart/form-data">
                <label htmlFor="file-upload">
                    {!iconName && <Icon.Camera className="icon" />}

                </label>
                <input
                    ref={fileinput}
                    name="postfile"
                    type="file" id="file-upload"
                    accept="image/*" className="file__input"
                    onChange={(event) => setFileSelected(event.target.files[0])}
                />
            </form>


        </Fragment>
    )
}

export default NewPostButton;