"use client"
import React, { useState } from 'react';
import { register } from '@/app/utils/queries';
import { useRouter } from "next/navigation";
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Send POST request to register user
        const response = await register(username, password)

        if (response.userId) {
            localStorage.setItem("userId", response.userId)
            localStorage.setItem("username", response.username)
            router.push("/")
        }
        else {
            alert("failed to log in");
        }
    };

    return (
        <div className='registerContainer'>
            <div className="wrapper">
                <div className="logo">soundscape</div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type="submit">Register</button>
                    </form>
                </div>
                <p>Already have an account ? <a href="/login">Sign In</a></p>
            </div>
        </div>
    );
}

export default Register;
