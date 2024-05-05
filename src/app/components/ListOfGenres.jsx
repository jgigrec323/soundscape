"use client"
import React, { useState, useEffect } from 'react';
import Genres from './Genres';
import { getAllGenres } from '../utils/queries';

function ListOfGenres() {
    const [genres, setGenres] = useState([]);
    const [areGenresFetched, setAreGenresFetched] = useState(false);

    const getGenres = async () => {
        try {
            const response = await getAllGenres();

            if (response.genres) {
                const firstSevenGenres = response.genres.slice(0, 7); // Get the first 7 genres
                setGenres(firstSevenGenres);
                setAreGenresFetched(true);
            } else {
                console.log("No genres");
            }
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    useEffect(() => {
        getGenres();
    }, []);

    return (
        <section className="listOfGenres">
            {areGenresFetched && genres.map(genre => (
                <Genres key={genre._id} genre={genre} />
            ))}
        </section>
    );
}

export default ListOfGenres;
