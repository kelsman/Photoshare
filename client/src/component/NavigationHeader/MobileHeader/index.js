import { useHistory } from 'react-router-dom';
import * as Icon from 'rect-feather';
import './style.scss';

const MobileHeader = ({ children, backArrow }) => {

    const history = useHistory();

    return (
        <header className="mobile__header">
            {backArrow && <Icon.ArrowLeft className="back__Arrow" />}
            {children}
        </header>
    )

}

export default MobileHeader