import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/users/${id}`) 
            .then((res) => setUser(res.data.user))
            .catch((err) => console.log(err));
    }, [id]);

    if (!user) return <h2>Loading...</h2>;

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Contact: {user.contact}</p>
        </div>
    );
};

export default UserProfile;
