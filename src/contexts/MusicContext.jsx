import { useEffect, useState } from "react";
import { songs } from "../data/songs";
import { MusicContext } from "../hooks/useMusicContext";
import { safeParse } from "../helpers/parse";

export const MusicProvider = ({ children }) => {
  const [allSongs] = useState(songs);
  const [currentTrackId, setCurrentTrackId] = useState(0);
  const currentTrack = allSongs[currentTrackId];
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playlists, setPlaylists] = useState(() => {
    const raw = localStorage.getItem("playlists");
    return safeParse(raw, []);
  });

  useEffect(() => {
    const encoded = JSON.stringify(playlists);
    const stored = localStorage.getItem("playlists");
    if (stored !== encoded) {
      try {
        localStorage.setItem("playlists", encoded);
      } catch (err) {
        console.error("Failed to write playlists to localStorage", err);
      }
    }
  }, [playlists]);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "playlists") {
        if (e.newValue === null) {
          setPlaylists([]);
          return;
        }
        const updated = safeParse(e.newValue, []);
        setPlaylists(updated);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handlePlaySong = (song, id) => {
    if (currentTrackId === id) return;
    setCurrentTrackId(id);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const createPlaylist = (name) => {
    const newPlayist = {
      id: Date.now(),
      name,
      songs: [],
    };

    setPlaylists((prev) => [...prev, newPlayist]);
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) => {
      return prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            songs: [...playlist.songs, song],
          };
        } else {
          return playlist;
        }
      });
    });
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId)
    );
  };

  const nextTrack = () => {
    setIsPlaying(false);
    setCurrentTrackId((prev) => {
      return prev === allSongs.length - 1 ? 0 : prev + 1;
    });
  };

  const prevTrack = () => {
    setIsPlaying(false);
    setCurrentTrackId((prev) => (prev === 0 ? allSongs.length - 1 : prev - 1));
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <MusicContext.Provider
      value={{
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
        play,
        pause,
        volume,
        setVolume,
        playlists,
        createPlaylist,
        addSongToPlaylist,
        deletePlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
