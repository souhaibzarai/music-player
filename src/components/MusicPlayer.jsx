import React, { useEffect, useEffectEvent, useRef } from "react";
import { useMusic } from "../hooks/useMusicContext";

export const MusicPlayer = () => {
  const {
    currentTrack,
    formatTime,
    currentTime,
    duration,
    setDuration,
    setCurrentTime,
    prevTrack,
    nextTrack,
    isPlaying,
    play,
    pause,
    volume,
    setVolume,
  } = useMusic();
  const audioRef = useRef(null);

  const onDurationChange = useEffectEvent(setDuration);
  const onTimeChange = useEffectEvent(setCurrentTime);
  const onEnd = useEffectEvent(nextTrack);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleTimeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.log(err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      onDurationChange(audio.duration);
    };

    const handleTimeUpdate = () => {
      onTimeChange(audio.currentTime);
    };

    const handleEnded = () => {
      onEnd();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  return (
    <div className="box">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="metadata"
        crossOrigin="anonymous"
      />
      <div className="track-info">
        <h3 className="track-title">{currentTrack.title}</h3>
        <p className="track-artist">{currentTrack.artist}</p>
      </div>

      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime || 0}
          onChange={handleTimeChange}
          className="progress-bar"
          style={{ "--progress": `${progressPercentage}%` }}
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="controls">
        <button className="control-btn" onClick={prevTrack}>
          {"<"}
        </button>
        <button className="control-btn play" onClick={isPlaying ? pause : play}>
          {isPlaying ? "◼" : "▶︎"}
        </button>
        <button className="control-btn" onClick={nextTrack}>
          {">"}
        </button>
      </div>
      <div className="volume-container">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};
