import React from 'react'
import { ReactComponent as LogoSvg } from '../../assets/logo-camera.svg';
import './style.scss';

const LoadingPage = () => {
    return (
        <div className="loading__page">
            <LogoSvg />
        </div>
    )
}

export default LoadingPage;