import React from 'react'

function Artists({ artist }) {
    return (
        <div className='artist'>
            <img src={artist.image} alt={artist.artist} />
        </div>
    )
}

export default Artists