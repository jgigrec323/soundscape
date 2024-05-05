"use client"
import BackButton from '@/app/components/BackButton'
import ListOfSongs from '@/app/components/ListOfSongs'
import { getSongsAvg, getSongsByGenre, getSongsTotalByGenre } from '@/app/utils/queries'
import React, { useEffect, useState } from 'react'

function GenrePage({ params }) {
    const [songs, setSongs] = useState()
    const [numberOfSong, setnumberOfSong] = useState(0)
    const [areSongsFetched, setAreSongsFetched] = useState(false)
    const [avgDuration, setAvgDuration] = useState(0)
    const { id: genre } = params

    const formattedGenre = genre
        .split("-") // Split the genre parameter by hyphens
        .map((word) => {
            if (word === "randb") {
                return "R&B"; // Handle "randb" case
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter of each word
            }
        })
        .join(" ");


    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    const getTotalAvg = async () => {
        const response = await getSongsAvg(genre)

        if (response.results[0].averageDuration) {
            setAvgDuration(Math.floor(response.results[0].averageDuration))
        }
        else {
            console.log("No songs")
        }
    }
    const getTotal = async () => {
        const response = await getSongsTotalByGenre(genre)

        if (response.songsByGenre[0]) {
            setnumberOfSong(response.songsByGenre[0].totalSongs)

        }
        else {
            console.log("No songs")
        }
    }
    const getSongs = async () => {
        const response = await getSongsByGenre(genre)

        if (response.songs) {
            setSongs(response.songs)
            setAreSongsFetched(true)
        }
        else {
            console.log("No songs")
        }
    }
    useEffect(() => {
        getSongs()
        getTotal()
        getTotalAvg()
    }, [])

    return (
        <>
            <BackButton></BackButton>
            <section className="genrePage">
                <div className="top">
                    <h3>{formattedGenre}</h3>
                    <div className="right">
                        <p>Total : <span>{numberOfSong}</span></p>
                        <p>Average duration : <span>{formatDuration(avgDuration)}</span></p>
                    </div>
                </div>
                <div className="bottom">
                    {areSongsFetched && <ListOfSongs searchable={true} songs={songs}></ListOfSongs>}
                </div>
            </section>
        </>
    )
}

export default GenrePage