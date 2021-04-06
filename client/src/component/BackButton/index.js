import React from 'react'
import * as Icon from 'react-feather';
import { useHistory } from 'react-router-dom'

function BackButton() {
    const history = useHistory();
    return <Icon.ArrowLeft onClick={() => history.goBack()} />
}

export default BackButton;
