import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getActiveProject } from "store/projects";
import history from "utils/history";

function NavBar() {
    const userID = "a123";
    const activeProject = useSelector(getActiveProject());
    const array = [
        { name: "Profile", link: `/profile/${userID}` },
        { name: "Projects", link: "/projects" },
        { name: "Board", link: `/project/${activeProject}/board` },
        { name: "Settings", link: "/settings" },
    ];
    const [active, setActive] = useState();

    useEffect(() => {
        setActive(history.location.pathname);
    }, [history.location.pathname]);

    function renderItem() {
        return array.map((item, index) => {
            const component = (
                <li className="nav-item" key={index}>
                    <Link to={item.link} onClick={() => setActive(item.link)}>
                        <span
                            className={`nav-link ${
                                item.link === active && "active"
                            }`}
                            aria-current="page"
                        >
                            {item.name}
                        </span>
                    </Link>
                </li>
            );
            if (item.name === "Board" && !activeProject) {
                return null;
            }
            return component;
        });
    }
    return (
        <>
            <nav className="p-2 flex-container">
                <ul className="nav nav-pills">{renderItem()}</ul>
            </nav>
        </>
    );
}

export default NavBar;
