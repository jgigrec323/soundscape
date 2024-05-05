"use client"
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useRouter } from 'next/navigation'

function BackButton() {
    const router = useRouter()
    return (
        <div className='backButton' onClick={() => { router.back() }}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </div>
    )
}

export default BackButton