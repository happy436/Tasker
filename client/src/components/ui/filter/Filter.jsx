import React, { useState } from "react";

function Filter() {
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState("Sort")
    const [type, setType] = useState()
    const handleActive = (type) => {
        setActive(!active);
        type && setType(type)
    };
    return (
        <div className="btn-group">
            <button type="button" className={`btn btn-secondary ${active && "show"}`}>
                {title}
            </button>
            <button
                type="button"
                className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => handleActive()}
            >
                <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className={`dropdown-menu ${active && "show"}`}>
                <li onClick={() => handleActive()}>
                    <a className="dropdown-item">
                        Action
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Filter;
