import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Profile() {
    const { userID } = useParams();
    return <div>Profile page {userID}</div>;
}

export default Profile;
