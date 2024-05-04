"use client"
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'next/navigation';

function ListOfPlaylists({ playlists }) {
    const { setCurrentPlaylistId } = useAppContext();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleOnClick = (id, name, description) => {
        localStorage.setItem("playlistName", name);
        localStorage.setItem("playlistDescription", description);
        setCurrentPlaylistId(id);
        sessionStorage.setItem("playlistId", id);
        router.push(`/playlists/${id}`);
    };

    const filteredPlaylists = playlists.filter(playlist => {
        const { name, description } = playlist;
        const query = searchQuery.toLowerCase();
        return name.toLowerCase().includes(query) || description.toLowerCase().includes(query);
    });

    return (
        <div>
            <input
                className='searchI'
                type="text"
                placeholder="Search playlists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul className='listOfPlaylist'>
                {filteredPlaylists.map((playlist, index) => (
                    <li key={index} onClick={() => handleOnClick(playlist._id, playlist.name, playlist.description)}>
                        <h2>{playlist.name}</h2>
                        <p>{playlist.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListOfPlaylists;
