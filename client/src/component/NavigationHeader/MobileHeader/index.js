import { useHistory } from 'react-router-dom';
import * as Icon from 'react-feather';
import './style.scss';

const MobileHeader = ({ children, backArrow }) => {

    const history = useHistory();

    return (
        <header className="mobile__header">
            {backArrow &&
                <Icon.ArrowLeft className="back__Arrow" onClick={() => history.goBack()} style={{ marginLeft: "10px" }} />
            }
            {children}

        </header>
    )

}

export default MobileHeader