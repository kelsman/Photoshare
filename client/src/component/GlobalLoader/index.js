import React from 'react'
import { useIsFetching } from 'react-query';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './style.scss';

const GlobaLoader = () => {
    const isFetching = useIsFetching();

    return isFetching ?
        <div className="globaloader">
            <Loader
                type="Oval"
                color="black"
                height={20}
                width={20}
            />
        </div>
        : null
}
export default GlobaLoader;