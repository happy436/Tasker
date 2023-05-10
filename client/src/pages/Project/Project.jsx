import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CardContainer from "../../components/ui/common/CardContainer";
import { getProjectByID } from "../../store/projects";
import ProjectHistory from "../ProjectHistory";

function Project() {
    const { projectID } = useParams();
    const project = useSelector(getProjectByID(projectID));
    const baseURL = `/project/${projectID}`;
    const list = [
        { link: `${baseURL}/team`, name: "Team" },
        { link: `${baseURL}/history`, name: "History" },
        { link: `${baseURL}/board`, name: "Board" },
        { link: `${baseURL}/settings`, name: "Settings" },
    ];
    const cardsList = [
        {
            title: "Team",
            body: "bla-bla",
            link: `${baseURL}/team`,
            styles: {},
        },
        {
            title: "History",
            body: <ProjectHistory/>,
            link: `${baseURL}/history`,
            styles: {},
        },
    ];
    return (
        <main className="d-flex flex-column p-3 gap-3">
            <h1>Project: {project.name}</h1>
            <nav>
                <ButtonGroup className="gap-3" as="ul">
                    {list.map((item) => (
                        <Link key={item.name} to={item.link}>
                            <Button>{item.name}</Button>
                        </Link>
                    ))}
                </ButtonGroup>
            </nav>
            {cardsList.map((item) => (
                <CardContainer data={item} key={item.title} />
            ))}
        </main>
    );
}

export default Project;
