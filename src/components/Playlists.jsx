import React, { useState } from "react";
import { useMusic } from "../hooks/useMusicContext";

export const Playlists = () => {
  const {
    playlists,
    createPlaylist,
    addSongToPlaylist,
    deletePlaylist,
    allSongs,
    handlePlaySong,
    currentTrackId,
  } = useMusic();
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
    }
  };

  const clearInput = () => {
    setSearchQuery("");
    setSelectedPlaylist(null);
    setShowDropdown(false);
  };

  const handleAddSongToPlaylist = (song) => {
    if (selectedPlaylist) {
      addSongToPlaylist(selectedPlaylist.id, song);
      clearInput();
    }
  };

  const deletePlaylistConfirmation = (playlist) => {
    if (window.confirm(`Are you sure you want to delete "${playlist.name}"`)) {
      deletePlaylist(playlist.id);
    }
  };

  const filteredSongs = allSongs.filter((song) => {
    const matches =
      song.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      song.artist.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());

    const isAlreadyInPlaylist = selectedPlaylist?.songs.some(
      (s) => s.id === song.id
    );

    return matches && !isAlreadyInPlaylist;
  });

  return (
    <div className="box playlists">
      <h2>Playlists</h2>
      <div className="create-playlist">
        <h3>Create a new playlist</h3>
        <div className="playlist-form">
          <input
            type="text"
            placeholder="Playlist name..."
            className="playlist-input"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button className="create-btn" onClick={handleCreatePlaylist}>
            Create
          </button>
        </div>
      </div>
      {/* Playlists List */}
      <div className="playlists-list">
        {playlists.length === 0 ? (
          <p className="empty-message">No playlists created yet.</p>
        ) : (
          playlists.map((playlist) => (
            <div className="playlist-item" key={playlist.id}>
              <div className="playlist-header">
                <h3 className="playlist-name">{playlist.name}</h3>
                <div className="playlist-actions">
                  <button
                    className="delete-playlist-btn"
                    onClick={() => deletePlaylistConfirmation(playlist)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="add-song-section">
                <div className="search-container">
                  <input
                    type="text"
                    className="song-search-input"
                    placeholder="Search songs to add..."
                    value={
                      selectedPlaylist?.id === playlist.id ? searchQuery : ""
                    }
                    onChange={(e) => {
                      setSelectedPlaylist(playlist);
                      setSearchQuery(e.target.value);
                      setShowDropdown(e.target.value.length > 0);
                    }}
                    onFocus={(e) => {
                      setSelectedPlaylist(playlist);
                      setShowDropdown(e.target.value.length > 0);
                    }}
                  />

                  {selectedPlaylist?.id === playlist.id && showDropdown && (
                    <div className="song-dropdown">
                      {filteredSongs.length === 0 ? (
                        <div
                          className="dropdown-item no-results"
                          onClick={clearInput}
                        >
                          No songs found...
                        </div>
                      ) : (
                        filteredSongs.slice(0, 5).map((song) => {
                          return (
                            <div
                              key={song.id}
                              className="dropdown-item"
                              onClick={() => handleAddSongToPlaylist(song)}
                            >
                              <div className="song-info">
                                <span className="song-title">{song.title}</span>
                                <span className="song-artist">
                                  {song.artist}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                  <div className="songs-section">
                    {playlist.songs.length === 0 ? (
                      <div className="empty-playlist">
                        No songs in this playlist
                      </div>
                    ) : (
                      playlist.songs.map((song) => {
                        return (
                          <div
                            className={`playlist-song-info ${
                              currentTrackId === song.id ? "active" : ""
                            }`}
                            onClick={() => {
                              clearInput();
                              handlePlaySong(song, song.id);
                            }}
                          >
                            <span className="song-title">{song.title}</span>
                            <span className="song-artist">{song.artist}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
