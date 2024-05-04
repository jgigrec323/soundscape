"use client"
import React, { useState } from 'react';
import { createPlaylist } from '../utils/queries';
import { toast } from 'sonner';

function CreatePlaylist({ fetchData }) {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDesc, setPlaylistDesc] = useState('');
    const notify = (msg) => toast.success(msg);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        const response = await createPlaylist(userId, playlistName, playlistDesc)

        if (response.addedPlaylistId) {

            notify(response.message)
            await fetchData()
        }
        else {
            notify(response.message)
        }
        // Clear the input fields after submission
        setPlaylistName('');
        setPlaylistDesc('');
    };

    return (
        <div className='createPlaylist'>
            <h3>Create a new playlist</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='playlistName'
                    placeholder='Name of the playlist'
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className='playlistDesc'
                    placeholder='Description (optional)'
                    value={playlistDesc}
                    onChange={(e) => setPlaylistDesc(e.target.value)}
                />
                <button className='btn' type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreatePlaylist;
