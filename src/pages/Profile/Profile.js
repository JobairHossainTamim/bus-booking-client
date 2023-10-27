import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    return (
        <div>
            <h1>Profile Name:{user?.name}</h1>

        </div>
    );
};

export default Profile;