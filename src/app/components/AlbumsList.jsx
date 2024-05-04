import React from 'react'

function AlbumsList({ albums }) {
    return (
        <ul className='albums'>
            {albums.map((album, index) => (
                <li key={index}>
                    <h2>{album._id}</h2>
                    <p className='artist'>{album.songs[0].artist}</p>
                    <p className='year'>{album.songs[0].year}</p>
                </li>
            ))}
        </ul>

    )
}

export default AlbumsList