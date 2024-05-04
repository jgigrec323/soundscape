"use client"
import React, { useState, useEffect } from 'react';
import { getAllPlaylistByUser } from '@/app/utils/queries';
import ListOfPlaylists from '@/app/components/ListOfPlaylists';
import CreatePlaylist from '@/app/components/CreatePlaylist';

function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [addPlaylist, setAddPlaylist] = useState(false)
    const [areDataFetched, setAreDataFetched] = useState(false);
    const fetchData = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        try {
            const response = await getAllPlaylistByUser(userId);
            if (response.playlists) {
                setPlaylists(response.playlists);
                setAreDataFetched(true);
            } else {
                console.error("Failed to fetch playlists");
            }
        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className='playlist'>
            <div className="header">
                <h2>My Playlists</h2>
                <button className='btn' onClick={() => { setAddPlaylist(!addPlaylist) }}>{addPlaylist === false ? "Create a playlist" : "Close"}</button>
            </div>
            {areDataFetched && playlists.length > 0 ? (
                <ListOfPlaylists playlists={playlists} />
            ) : (
                <p>No playlists yet</p>
            )}
            {addPlaylist && <CreatePlaylist fetchData={fetchData}></CreatePlaylist>}
        </section>
    );
}

export default Playlists;
