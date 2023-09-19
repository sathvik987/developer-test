import React from 'react';
import "./search-box.css"

const SearchBox = (props) => {
    return (
        <div>
            <input
                className="search-input"
                type="text"
                placeholder="Search"
                onChange={props.searchChange}

            />
        </div>
    );
}

export default SearchBox;