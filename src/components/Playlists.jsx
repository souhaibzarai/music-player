import React, { useState } from "react";
import { useMusic } from "../hooks/useMusicContext";

export const Playlists = () => {
  const { playlists, createPlaylist, allSongs } = useMusic();
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
                  <button className="delete-playlist-btn">Delete</button>
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
                        <div className="dropdown-item no-results">
                          No songs found...
                        </div>
                      ) : (
                        <div className="dropdown-item">
                          {filteredSongs.length}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
