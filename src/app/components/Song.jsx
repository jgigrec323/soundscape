import React, { useRef } from 'react'
import AddSongButton from './AddSongButton'
import DeleteSongButton from './DeleteSongButton'
import { useAppContext } from '../context/AppContext'

function Song({ updateSong, index, song, addable, deletable }) {
    const { setCurrentSong } = useAppContext()


    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    // Function to handle clicking on a song
    const handleSongClick = (song) => {
        // Store song information in localStorage
        localStorage.setItem('currentSong', JSON.stringify(song));
        // Set initial play state to paused
        localStorage.setItem('isPlaying', 'false');
        setCurrentSong(song)
    };

    return (
        <div className='song' onClick={() => handleSongClick(song)}>
            <p className="index">{index + 1}</p>
            <div className="title">
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
            </div>
            <div className="album">
                <p>{song.album}</p>
            </div>
            <div className="duration">
                <p>{formatDuration(song.duration)}</p>
            </div>
            <div className="actionsBtn">
                {addable && <AddSongButton updateSong={updateSong} id={song._id}></AddSongButton>}
                {deletable && <DeleteSongButton updateSong={updateSong} id={song._id}></DeleteSongButton>}
            </div>
        </div>
    )
}

export default Song