import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, withRouter, useLocation  } from "react-router-dom";
import { getActiveProject } from "store/projects";

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
    const location = useLocation()

    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    function renderItem() {
        return array.map((item, index) => {
            const component = (
                <li className="nav-item" key={index}>
                    <Link to={item.link} /* onClick={() => setActive(item.link)} */>
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

export default withRouter(NavBar);
