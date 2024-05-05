"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllSongs } from '../utils/queries';

// Create a context for your provider
const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
    // Define your states here

    const [allSongs, setAllSongs] = useState([])
    const [areSongsFetched, setAreSongsFetched] = useState(false)


    const [currentPlaylistId, setCurrentPlaylistId] = useState(0);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const getSongs = async () => {
        const response = await getAllSongs()

        if (response.songs) {
            setAllSongs(response.songs)
            setAreSongsFetched(true)
        }
        else {
            console.log("failed to get all songs")
        }
    }
    useEffect(() => {
        getSongs()
    }, [])

    // Implement function to get current song from localStorage
    const getCurrentSongFromLocalStorage = () => {
        const storedCurrentSong = JSON.parse(localStorage.getItem('currentSong'));
        setCurrentSong(storedCurrentSong);
    };

    useEffect(() => {
        getCurrentSongFromLocalStorage();
    }, []);


    // Provide the states and functions to the children components
    return (
        <AppContext.Provider value={{
            currentPlaylistId, setCurrentPlaylistId, allSongs, areSongsFetched, currentSong, isPlaying, setCurrentSong, setIsPlaying
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Create a custom hook to consume the context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};