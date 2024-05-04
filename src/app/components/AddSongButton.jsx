
import React from 'react'
import { toast } from 'sonner';
import { addASongToPlaylist } from '../utils/queries'

function AddSongButton({ updateSong, id }) {

    const notify = (msg) => toast.success(msg);
    const addSong = async () => {
        const currentPlaylistId = sessionStorage.getItem("playlistId")
        if (!currentPlaylistId) {
            alert("no playlist found")
            return
        }
        console.log(id)
        const response = await addASongToPlaylist(id, currentPlaylistId)

        if (response.playlistModified == 1) {
            console.log("added")
            updateSong()

        }
        else {
            console.log("failed")
        }
        notify(response.message)
    }

    return (
        <button className='btn' onClick={addSong}>Add</button>
    )
}

export default AddSongButton