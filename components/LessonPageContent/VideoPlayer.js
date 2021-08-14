import React, { useState, useRef, useEffect } from "react";
import styles from "@styles/LessonPageContent/VidoPlayer.module.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const VideoPlayer = ({ videoSrcUrl }) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  // references
  const videoPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  useEffect(() => {
    const seconds = videoPlayer.current.duration;
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [videoPlayer?.current?.loadedmetadata, videoPlayer?.current?.readyState]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      videoPlayer.current.onended = handleEndOfPlaying;
      videoPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      videoPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleEndOfPlaying = () => {
    setIsPlaying(false);
    progressBar.current.value = 0;
    changeRange();
    cancelAnimationFrame(animationRef.current);
  };

  const whilePlaying = () => {

    if(videoPlayer?.current === null){
      return;
    }
    progressBar.current.value = videoPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    videoPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
  };

  return (
    <div className={styles.playerContainer}>
      <video
        className={styles.videoElement}
        ref={videoPlayer}
        preload='metadata'
        width={"100%"}
      >
        <source src={videoSrcUrl} type='video/mp4'></source>
      </video>
      <div className={styles.controlPanel}>
        <button onClick={togglePlayPause} className={styles.playPause}>
          {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
        </button>

        {/* progress bar */}
        <div className={styles.progressBarContainer}>
          <input
            type='range'
            step='0.05'
            className={styles.progressBar}
            defaultValue='0'
            ref={progressBar}
            onChange={changeRange}
          />
        </div>
      </div>
    </div>
  );
};

export { VideoPlayer };
