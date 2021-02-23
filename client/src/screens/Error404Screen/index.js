import React from 'react'
import './style.scss';
import scarecrow from '../../assets/Scarecrow.png';
import { withRouter } from 'react-router-dom';

function Error404({ history }) {

    return (
        <div className="container">
            <h3> 404 not found</h3>
            <section>
                <div className="scarescrow-wrappper">
                    <img src={scarecrow} alt="" />
                </div>
                <div className="error-msg">
                    <h1> I have Bad News For You</h1>
                    <p>The page you are looking for might be removed or is temporarily unavailable </p>
                    <button onClick={() => history.push('/')}> back to Home</button>
                </div>
            </section>
        </div>
    )
}

export default withRouter(Error404);
