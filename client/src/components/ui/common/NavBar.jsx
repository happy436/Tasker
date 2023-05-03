import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar() {
    const array = [
        { name: "Profile", link: "/profile", disabled: true },
        { name: "Project", link: "/project", disabled: false },
        { name: "Board", link: "/board", disabled: false },
        { name: "Settings", link: "/settings", disabled: true },
    ];
    const [active, setActive] = useState("/board");
    return (
        <>
            <nav>
                <ul className="nav nav-pills">
                    {array.map((item, index) => (
                        <li className="nav-item" key={index}>
                            <Link
                                to={item.link}
                                onClick={() => setActive(item.link)}
                            >
                                <span
                                    className={`nav-link ${
                                        item.link === active &&
                                        "active"
                                    }`}
                                    aria-current="page"
                                >
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default NavBar;
