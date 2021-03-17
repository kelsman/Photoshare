import React from 'react';
import './style.scss';
import { ReactComponent as LoaderSvg } from '../../assets/loader.svg';

const Loader = () => {
    return (
        <div className="loader_wrapper">

            <LoaderSvg className="Loader__svg" />

        </div>
    )
};

export default Loader;