import React from 'react';
import * as Routes from '../routes'
import styled from 'styled-components';

// const Logo = styled.h2`
// /* width: 100px; */
// font-family: 'Dancing Script', 'cursive';
// cursor: pointer;
// color: "black"
// `
const LogoText = () => {
    return (


        <h2 onClick={() => history.push(Routes.Dashboard)}>
            {' '}
            Photogram
        </h2>



    )
}

export default LogoText;