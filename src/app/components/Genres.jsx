import React from 'react';
import { useRouter } from 'next/navigation';

function Genres({ genre }) {
    const router = useRouter();

    // Function to format genre name
    const formatGenreName = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
    };


    const handleClick = () => {
        router.push(`/genres/${formatGenreName(genre.genre)}`);
    };

    return (
        <div className="genre" onClick={handleClick}>
            <div className="top">
                <img src={genre.image} alt="rap" />
            </div>
            <p>{genre.genre}</p>
        </div>
    );
}

export default Genres;
