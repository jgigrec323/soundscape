"use client"
import React, { useEffect, useState } from 'react';
import Artists from './Artists';
import { getArtists } from '../utils/queries';

function PopularArtists() {
    const [artists, setArtists] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    const getArtist = async () => {
        const response = await getArtists();

        if (response.artists) {
            setArtists(response.artists);
            setDataFetched(true);
        } else {
            console.log("Failed to fetch artists");
        }
    };

    useEffect(() => {
        getArtist();
    }, []);

    return (
        <div className='popularArtists'>
            <h3>Popular Artists</h3>
            <div className="artists">
                {dataFetched && artists.map((artist, index) => (
                    <Artists key={index} artist={artist} />
                ))}
            </div>
        </div>
    );
}

export default PopularArtists;
