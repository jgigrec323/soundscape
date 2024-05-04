import React, { useState } from 'react';
import Song from './Song';

function ListOfSongs({ searchable, updateSong, addable, deletable, songs }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSongs = songs.filter(song => {
        const { title, artist } = song;
        const query = searchQuery.toLowerCase();
        return title.toLowerCase().includes(query) || artist.toLowerCase().includes(query);
    });

    return (
        <div className='listOfSongs'>
            {searchable && <input
                className='searchI'
                type="text"
                placeholder="Search songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />}
            <ul>
                {filteredSongs.map((song, index) => (
                    <li key={index}>
                        <Song updateSong={updateSong} addable={addable} deletable={deletable} index={index} song={song} />
                    </li>
                ))}
            </ul>
        </div >
    );
}

export default ListOfSongs;
