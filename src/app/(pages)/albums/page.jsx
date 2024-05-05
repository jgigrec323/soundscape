"use client"
import AlbumsList from '@/app/components/AlbumsList'
import BackButton from '@/app/components/BackButton'
import { getAllAlbums } from '@/app/utils/queries'
import React, { useState, useEffect } from 'react'

function Albums() {
    const [albums, setAlbums] = useState([])
    const [areDataFetched, setAreDataFetched] = useState(false)
    const getAlbums = async () => {
        const response = await getAllAlbums()

        if (response.songsByAlbum) {
            setAlbums(response.songsByAlbum)
            console.log(albums)
            setAreDataFetched(true)
        }
        else {
            alert("failed")
        }
    }
    useEffect(() => {
        getAlbums()
    }, [])
    return (
        <div>
            <BackButton></BackButton>
            {areDataFetched &&
                <>
                    <AlbumsList albums={albums}></AlbumsList>
                </>
            }

        </div>
    )
}

export default Albums