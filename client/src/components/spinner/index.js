import React from 'react'
import Loading from '../../assets/images/loading.gif'

const Spinner = () => {

    return (
        <div className="spinner-wrapper">

            <img src={Loading} alt="" />

        </div>
    )
};

export default Spinner;