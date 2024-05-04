"use client"
import AddSongToPlaylist from '@/app/components/AddSongToPlaylist'
import DeleteButton from '@/app/components/DeleteButton'
import ListOfSongs from '@/app/components/ListOfSongs'
import { getSongsByPlaylistId } from '@/app/utils/queries'
import React, { useState, useEffect } from 'react'

function PlaylistPage({ params }) {
    const [songs, setSongs] = useState([])
    const [areSongsFetched, setAreSongsFetched] = useState(false)
    const [addSong, setAddSong] = useState(false)
    const name = localStorage.getItem("playlistName")
    const description = localStorage.getItem("playlistDescription")


    const { id } = params

    const getSongs = async () => {
        const response = await getSongsByPlaylistId(id)

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
    }, [])
    return (
        <section className='playlistPage'>
            <div className="top">
                <div className="left">
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>
                <div className="right">
                    <button onClick={() => { setAddSong(!addSong) }} className='btn'>{!addSong ? "Add song" : "Close"}</button>
                    <DeleteButton id={id}>Delete playlist</DeleteButton>
                    <button className='btn'>Edit</button>
                </div>
            </div>
            <div className="bottom">
                {areSongsFetched && songs.length != 0 ?
                    <>
                        <ListOfSongs searchable={true} updateSong={getSongs} addable={false} deletable={true} songs={songs}></ListOfSongs>
                    </> : <p>No songs found</p>
                }

                {addSong && <AddSongToPlaylist updateSong={getSongs} ></AddSongToPlaylist>}
            </div>
        </section>
    )
}

export default PlaylistPage