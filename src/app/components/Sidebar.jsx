import React from 'react'

function Sidebar() {
    return (
        <aside className='sidebar'>
            <div className="logo">soundscape</div>

            <ul className="navlinks">
                <li><a href="/">Home</a></li>
                <li><a href="/history">History</a></li>
                <p>Library</p>
                <li><a href="/songs">Songs</a></li>
                <li><a href="/albums">Albums</a></li>
                <li><a href="/favorites">Favorites</a></li>
                <p>Playlists</p>
                <li><a href="/playlists">My playlists</a></li>
            </ul>
        </aside>
    )
}

export default Sidebar