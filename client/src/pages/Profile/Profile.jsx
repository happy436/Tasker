import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Profile() {
	const { userID } = useParams();
	const getRandomAvatar = () =>
		`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
			.toString(36)
			.substring(7)}.svg`;
	return (
		<main className="container">
			<div>{userID}</div>
			<img
				height="200px"
                alt="user avatar"
				style={{ borderRadius: "100%", border: "1px solid red" }}
				src={getRandomAvatar()}
			/>
			<Button>Projects</Button>
			<Button>Edit profile</Button>
		</main>
	);
}

export default Profile;
