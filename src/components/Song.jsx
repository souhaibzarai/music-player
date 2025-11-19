export const Song = ({ song, onSongClick, isActive }) => {
  return (
    <div
      className={`song-card ${isActive ? "active" : ""}`}
      onClick={onSongClick}
    >
      <h3 className="song-title">{song.title}</h3>
      <p className="song-artist">{song.artist}</p>
      <span className="song-duration">{song.duration}</span>
      {isActive ? (
        <p className="song-status active">♪</p>
      ) : (
        <p className="song-status">▶︎</p>
      )}
    </div>
  );
};
