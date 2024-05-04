"use client"
import React, { useEffect } from 'react'
import { deleteInstance } from '../utils/queries'
import { useRouter } from "next/navigation"

function DeleteButton({ id, children }) {
    const router = useRouter()
    const deletePlaylist = async () => {
        const sure = window.confirm("Would you like to delete this playlist?")

        if (sure) {
            const response = await deleteInstance("playlists", id)

            if (response.playlistDeleted.deletedCount == 1) {
                router.back()
            }
            else {
                alert("failed")
            }
        }
        else {
            return
        }


    }

    return (
        <button className='btn' onClick={deletePlaylist}>{children ? children : "Delete"}</button>
    )
}

export default DeleteButton