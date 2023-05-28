import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import UserImage from "assets/img/user.png";

function Profile() {
    const { userID } = useParams();
    const getRandomAvatar = () =>
        `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`;
    const list = [
        { link: "", name: "Projects" },
        { link: "", name: "Edit profile" },
    ];
    const user = { name: "Peter", img: "", id: "" };
    return (
        <main className="container d-flex flex-column gap-3">
            <div className="d-flex flex-column align-items-center">
                <img
                    height="200px"
                    width="200px"
                    alt="user avatar"
                    style={{
                        borderRadius: "100%",
                        border: "4px solid #afbcfa",
                    }}
                    src={user.avatar === "" ? UserImage : ""}
                />
                <h2>{user.name}</h2>
            </div>

            <ButtonGroup className="gap-3" as="ul">
                {list.map((button) => (
                    <Link key={button.name}>
                        <Button>{button.name}</Button>
                    </Link>
                ))}
            </ButtonGroup>
        </main>
    );
}

export default Profile;
