import React from 'react'
import Artists from './Artists'

function PopularArtists() {
    return (
        <div className='popularArtists'>
            <h3>Popular Artists</h3>
            <div className="artists">
                <Artists></Artists>
                <Artists></Artists>
                <Artists></Artists>
                <Artists></Artists>
                <Artists></Artists>
                <Artists></Artists>
            </div>
        </div>
    )
}

export default PopularArtists