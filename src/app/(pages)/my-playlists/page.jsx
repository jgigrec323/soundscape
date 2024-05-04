import React from 'react'

function MyPlaylists() {
    return (

        <section>
            <div className="top">
                <button>Create</button>
                <button>Get All</button>
                <button>Update</button>
                <button>Delete</button>
            </div>
            <div className="bottom">
                <ul>
                    <li>
                        Playlist name
                        <div className='actions'>
                            <button>Edit</button>
                            <button></button>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default MyPlaylists