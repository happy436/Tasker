import React from "react";
import { UilSearch } from '@iconscout/react-unicons'

function Search() {
    return (
        <div className="input-group">
            <button className="btn btn-outline-secondary" type="button"><UilSearch/></button>
            <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
            >
                Dropdown
            </button>
            <ul className="dropdown-menu">
                <li>
                    <a className="dropdown-item" href="#">
                        Action
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Another action
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Something else here
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Separated link
                    </a>
                </li>
            </ul>
            <input
                type="text"
                className="form-control"
                aria-label="Text input with dropdown button"
            />
        </div>
    );
}

export default Search;
