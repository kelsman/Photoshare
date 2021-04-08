import { useHistory } from 'react-router-dom';
import * as Icon from 'rect-feather';

const MobileHeader = ({ children }) => {

    const history = useHistory();

    return (
        <header>
            <Icon.ArrowLeft />
            {children}

        </header>
    )

}