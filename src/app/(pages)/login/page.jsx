"use client"
import React, { useState } from 'react';
import { login } from '@/app/utils/queries';
import { useRouter } from "next/navigation";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send POST request to login
        const response = await login(username, password)

        if (response.userId) {
            localStorage.setItem("userId", response.userId)
            setIsLoggedIn(true);
            router.push("/")
        }
        else {
            alert("failed to log in");
        }

    };

    return (
        <div className='loginContainer'>
            <div className="wrapper">
                <div className="logo">soundscape</div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Login</button>
                    </form>
                </div>
                <p>Don't have an account ? <a href="/register">Register</a></p>
            </div>
        </div>
    );
}

export default Login;
