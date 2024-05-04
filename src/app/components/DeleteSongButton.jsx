import React from 'react'
import { removeSongFromPlaylist } from '../utils/queries'
import { toast } from 'sonner';

function DeleteSongButton({ updateSong, id }) {
    const notify = (msg) => toast.success(msg);
    const deleteSong = async () => {
        const currentPlaylistId = sessionStorage.getItem("playlistId")
        if (!currentPlaylistId) {
            alert("no playlist found")
            return
        }

        const response = await removeSongFromPlaylist(id, currentPlaylistId)

        if (response.playlistModified == 1) {
            console.log("removed")
            updateSong()

        }
        else {
            console.log("failed")
        }
        notify(response.message)
    }

    return (
        <>
            <button className='btn' onClick={deleteSong}>Remove</button>

        </>
    )
}

export default DeleteSongButton