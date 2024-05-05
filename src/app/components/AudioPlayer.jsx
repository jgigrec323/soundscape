"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBackwardStep,
    faForwardStep,
    faPause,
    faPlay,
    faRepeat,
    faShuffle,
    faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from '../context/AppContext';

function AudioPlayer() {
    const { currentSong, setCurrentSong, isPlaying, setIsPlaying, allSongs } = useAppContext();
    const [volume, setVolume] = useState(50);
    const [sliderValue, setSliderValue] = useState(0);
    const currentTime = useRef();
    const durationTime = useRef();
    const audioRef = useRef(new Audio());
    const updateTimerRef = useRef();
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    // Function to toggle play/pause
    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
        localStorage.setItem('isPlaying', JSON.stringify(!isPlaying));
    };

    // Handle volume change
    const handleVolumeChange = (event) => {
        const newVolume = parseInt(event.target.value);
        setVolume(newVolume);
        const audio = audioRef.current;
        audio.volume = newVolume / 100;
        localStorage.setItem('volume', newVolume);
    };

    // Handle seek to specific time
    const handleSeekTo = (event) => {
        const val = parseInt(event.target.value);
        setSliderValue(val);
        const audio = audioRef.current;
        let seekTime = 0;

        if (!isNaN(audio.duration)) {
            seekTime = (audio.duration * val) / 100;
        }

        audio.currentTime = seekTime;
    };

    // Format duration in minutes:seconds
    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Reset values when song changes or ends
    function resetValues() {
        currentTime.current.textContent = '0:00';
        durationTime.current.textContent = '0:00';
        setSliderValue(0); // Added this line to reset the slider
    }

    // Load and play the current song
    function loadTrack() {
        clearInterval(updateTimerRef.current);
        resetValues();
        const audio = audioRef.current;
        if (currentSong) {
            audio.pause(); // Pause current song
            audio.src = currentSong.file;
            audio.load();
            if (isPlaying) {
                audio.play();
                updateTimerRef.current = setInterval(seekUpdate, 1000);
            }
        }
    }

    // Update time and progress bar
    function seekUpdate() {
        const audio = audioRef.current;
        let seekPosition = 0;

        if (!isNaN(audio.duration)) {
            seekPosition = (audio.currentTime * 100) / audio.duration;
            setSliderValue(seekPosition);

            const currentMinutes = Math.floor(audio.currentTime / 60);
            const currentSeconds = Math.floor(audio.currentTime % 60);
            const durationMinutes = Math.floor(audio.duration / 60);
            const durationSeconds = Math.floor(audio.duration % 60);

            currentTime.current.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
            durationTime.current.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
        }
    }

    // Play next song
    const playNextSong = () => {
        let nextIndex = currentSongIndex + 1;
        if (nextIndex >= allSongs.length) {
            nextIndex = 0; // Wrap around to the beginning if reached the end
        }
        setCurrentSong(allSongs[nextIndex]);
        setCurrentSongIndex(nextIndex);
    };

    // Play previous song
    const playPreviousSong = () => {
        let prevIndex = currentSongIndex - 1;
        if (prevIndex < 0) {
            prevIndex = allSongs.length - 1; // Wrap around to the end if reached the beginning
        }
        setCurrentSong(allSongs[prevIndex]);
        setCurrentSongIndex(prevIndex);
    };

    // Handle audio events (play, pause, ended)
    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('play', () => setIsPlaying(true));
        audio.addEventListener('pause', () => setIsPlaying(false));
        audio.addEventListener('ended', () => {
            setIsPlaying(false);
            // Play next song if loop is on, else do nothing
            if (loop) {
                playNextSong();
            }
        });

        return () => {
            audio.removeEventListener('play', () => setIsPlaying(true));
            audio.removeEventListener('pause', () => setIsPlaying(false));
            audio.removeEventListener('ended', () => setIsPlaying(false));
        };
    }, [setIsPlaying]);

    // Retrieve state from localStorage on initial render
    useEffect(() => {
        const storedIsPlaying = JSON.parse(localStorage.getItem('isPlaying'));
        if (storedIsPlaying !== null) {
            setIsPlaying(storedIsPlaying);
        }
        const storedCurrentSong = JSON.parse(localStorage.getItem('currentSong'));
        setCurrentSong(storedCurrentSong);
    }, [setCurrentSong, setIsPlaying]);

    // Load track only when currentSong changes
    useEffect(() => {
        loadTrack();
        return () => {
            clearInterval(updateTimerRef.current); // Clear the interval when the component unmounts
        };
    }, [currentSong]); // Only trigger when currentSong changes

    return (
        <div className="audioPlayer">
            <div className="left">
                <h3 className="songTitle">{currentSong ? currentSong.title : 'No song selected'}</h3>
                <p className="songArtist">{currentSong ? currentSong.artist : ''}</p>
            </div>
            <div className="right">
                <div className="controls">
                    <div className="backward" onClick={playPreviousSong}>
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </div>
                    <div className="playStop" onClick={togglePlayPause}>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </div>
                    <div className="forward" onClick={playNextSong}>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </div>
                </div>
                <div className="infos">
                    <div className='progressBar'>
                        <input
                            type="range"
                            onChange={handleSeekTo}
                            value={sliderValue}
                            min="0"
                            max="100"
                        />
                        <div style={{ width: `${sliderValue}%` }} id="value"></div>
                    </div>
                    <div className="timeProgress">
                        <span ref={currentTime}>00:00</span>/<span ref={durationTime}></span>
                    </div>
                </div>
                <div className="othersControls">
                    <FontAwesomeIcon icon={faShuffle} />
                    <FontAwesomeIcon icon={faRepeat} />
                    <div className="audioControls">
                        <FontAwesomeIcon icon={faVolumeHigh} />

                        <input
                            type="range"
                            className="volume_slider"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleVolumeChange}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;
