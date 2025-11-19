import { useMusic } from "../hooks/useMusicContext";
import { Song } from "./Song";

export const AllSongs = () => {
  const { allSongs, currentTrackId, handlePlaySong } = useMusic();
  return (
    <div className="box all-songs">
      <h2>All Songs ({allSongs.length})</h2>
      <div className="songs-grid">
        {allSongs.map((song) => (
          <Song
            key={song.id}
            song={song}
            onSongClick={() => handlePlaySong(song, song.id)}
            isActive={currentTrackId === song.id}
          />
        ))}
      </div>
    </div>
  );
};
