"use client"
import ListOfSongs from '@/app/components/ListOfSongs'
import { getAllSongs } from '@/app/utils/queries'
import React, { useEffect, useState } from 'react'

function Songs() {
    const [songs, setSongs] = useState([])
    const [areSongsFetched, setAreSongsFetched] = useState(false)
    const getSongs = async () => {
        const response = await getAllSongs()

        if (response.songs) {
            setSongs(response.songs)
            setAreSongsFetched(true)
        }
        else {
            alert("failed")
        }
    }
    useEffect(() => {
        getSongs()
    }, [])
    return (
        <section className='songs'>
            <div className="left" >
                {areSongsFetched &&
                    <>
                        <ListOfSongs searchable={true} songs={songs}></ListOfSongs>
                    </>
                }
            </div>
        </section>
    )
}

export default Songs