import React, { useState, useEffect } from 'react';
import { getAllSongs } from '../utils/queries';
import ListOfSongs from './ListOfSongs';

function AddSongToPlaylist({ updateSong }) {
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [areSongsFetched, setAreSongsFetched] = useState(false);

    const getSongs = async () => {
        try {
            const response = await getAllSongs();

            if (response.songs) {
                setSongs(response.songs);
                setFilteredSongs(response.songs); // Set filtered songs initially
                setAreSongsFetched(true);
            } else {
                alert('Failed to fetch songs');
            }
        } catch (error) {
            console.error('Error fetching songs:', error);
            alert('Failed to fetch songs');
        }
    };

    useEffect(() => {
        getSongs();
    }, []);

    // Function to handle search input change
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        // Filter songs based on search term
        const filtered = songs.filter(song =>
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm) ||
            song.album.toLowerCase().includes(searchTerm)
        );
        setFilteredSongs(filtered);
    };

    return (
        <div className='addSongToPlaylist'>
            <h3>Add song</h3>
            <input
                type="search"
                placeholder='Search title, artist, album'
                value={searchTerm}
                onChange={handleSearch}
            />

            {areSongsFetched && filteredSongs.length > 0 ? (
                <ListOfSongs updateSong={updateSong} addable={true} deletable={false} songs={filteredSongs} />
            ) : (
                <p>No playlists yet</p>
            )}
        </div>
    );
}

export default AddSongToPlaylist;
