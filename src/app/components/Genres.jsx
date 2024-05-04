import React from 'react'

function Genres({ name, img }) {
    return (
        <div className="genre">
            <div className="top">
                <img src="https://media.istockphoto.com/id/92026251/fr/photo/hip-hop-musicien.jpg?s=612x612&w=0&k=20&c=-7HvM-t4xE4w2lZ5tO7cN5vJTlMhgZAob2T4Ok_pJWM=" alt="rap" />
            </div>
            <p>{name}</p>
        </div>
    )
}

export default Genres