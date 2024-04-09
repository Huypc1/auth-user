import React, { useContext } from 'react';
import { UseContext } from '../context/userContent';

const Home = () => {
    const { user } = useContext(UseContext);
    return (
        <div>
            <h1>Home</h1>
            {user &&(
                <p>Welcome, {user.user}!</p>
            )}
        </div>
    );
}

export default Home;
