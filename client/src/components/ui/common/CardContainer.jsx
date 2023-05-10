import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

function CardContainer({ data }) {
    return (
        <Card style={data.styles.card}>
            <Card.Body className="d-flex flex-column" style={data.styles.body}>
                <Card.Title style={data.styles.title}>{data.title}</Card.Title>
                <div style={data.styles.text}>{data.body}</div>
                <Link
                    style={data.styles.link}
                    to={data.link}
                    className="align-self-center"
                >
                    <Button variant={data.styles.button}>Show all</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default CardContainer;
