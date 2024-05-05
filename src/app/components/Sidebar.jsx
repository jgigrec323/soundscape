import React from 'react'

function Sidebar() {
    return (
        <aside className='sidebar'>
            <div className="logo">Soundscape</div>

            <ul className="navlinks">
                <li><a href="/">Home</a></li>

                <p>Library</p>
                <li><a href="/songs">Songs</a></li>
                <li><a href="/albums">Albums</a></li>

                <p>Playlists</p>
                <li><a href="/playlists">My playlists</a></li>
            </ul>
        </aside>
    )
}

export default Sidebar