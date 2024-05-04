import ListOfSongs from '@/app/components/ListOfSongs'
import { getAllSongs } from '@/app/utils/queries'
import React, { useEffect, useState } from 'react'

function SuggestedSongs() {
    const [songs, setSongs] = useState([])
    const [suggestedSongs, setSuggestedSongs] = useState([])
    const [areSongsFetched, setAreSongsFetched] = useState(false)

    const getSongs = async () => {
        const response = await getAllSongs()

        if (response.songs) {
            setSongs(response.songs)
            setAreSongsFetched(true)
            suggestSongs(response.songs)
        } else {
            alert("Failed to fetch songs")
        }
    }

    const suggestSongs = (songs) => {
        const shuffledSongs = songs.sort(() => Math.random() - 0.5)
        const selectedSongs = shuffledSongs.slice(0, 3)
        setSuggestedSongs(selectedSongs)
    }

    useEffect(() => {
        getSongs()
    }, [])

    return (
        <div className='suggestedSongs'>
            <h3>Suggested songs</h3>
            {areSongsFetched && (
                <ListOfSongs songs={suggestedSongs}></ListOfSongs>
            )}
        </div>
    )
}

export default SuggestedSongs
