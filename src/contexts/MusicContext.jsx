import { useState } from "react";
import { songs } from "../data/songs";
import { MusicContext } from "../hooks/useMusicContext"

export const MusicProvider = ({ children }) => {
  const [allSongs] = useState(songs);
  const [currentTrackId, setCurrentTrackId] = useState(0);
  const currentTrack = allSongs[currentTrackId];
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(.5);
  const [playlists, setPlaylists] = useState([]);

  const createPlaylist = (name) => {
    const newPlayist = {
      id: Date.now(),
      name,
      songs: [],
    }

    setPlaylists((prev) => [...prev, newPlayist]);
  }

  const handlePlaySong = (song, id) => {
    if (currentTrackId === id) return;
    setCurrentTrackId(id);
    setIsPlaying(false);
    setCurrentTime(0);
  }

  const nextTrack = () => {
    setIsPlaying(false);
    setCurrentTrackId((prev) => {
      return prev === allSongs.length - 1 ? 0 : prev + 1;
    })
  }

  const prevTrack = () => {
    setIsPlaying(false);
    setCurrentTrackId((prev) =>
      prev === 0 ? allSongs.length - 1 : prev - 1);
  }

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <MusicContext.Provider value={{
      allSongs,
      handlePlaySong,
      currentTrack,
      currentTrackId,
      formatTime,
      currentTime,
      duration,
      setDuration,
      setCurrentTime,
      nextTrack,
      prevTrack,
      isPlaying,
      play, pause,
      volume,
      setVolume,
      playlists,
      createPlaylist,
    }} >
      {children}
    </MusicContext.Provider>
  )
}