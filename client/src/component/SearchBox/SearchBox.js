import React, { Fragment, useState } from 'react'
import './style.scss';

import * as Icon from 'react-feather';

const SearchBox = ({ }) => {

    const [query, setQuery] = useState('');

    return (
        <Fragment>

            <form
                className="search-box"
                onSubmit={(event) => event.preventDefault()}
            >
                <input
                    onChange={(event) => {
                        setQuery(event.target.value)
                    }}
                    onClick={(onClick => console.log('serach ready'))}
                    value={query}
                    className="search-box__input"
                    placeholder="Search"
                />
                <span className="search-box__placeholder">
                    <Icon.Search className="searchbox__icon" size={16} />
                    {/* fetching && <Loader /> */}
                </span>


            </form>

        </Fragment>
    )
}

export default SearchBox



