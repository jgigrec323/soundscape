"use client"
import React, { useState, useEffect } from 'react'

function Navbar() {
    const [profil, setProfil] = useState()
    useEffect(() => {
        const username = localStorage.getItem("username")
        if (username) {
            setProfil(username.charAt(0).toUpperCase())
        }
    }, [])
    return (
        <nav>
            <div className="profile">
                {profil}
            </div>
        </nav>
    )
}

export default Navbar
