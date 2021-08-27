import React, { useState, useRef, useEffect } from "react";
import styles from "@styles/LessonPageContent/VidoPlayer.module.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

interface Props {
  videoSrcUrl: string;
}
const VideoPlayer = ({ videoSrcUrl }: Props) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  // references
  const videoPlayer = useRef<HTMLVideoElement>(null); // reference our video component
  const progressBar = useRef<HTMLInputElement>(null); // reference our progress bar
  const animationRef = useRef(0); // reference the animation

  useEffect(() => {
    const seconds = videoPlayer?.current?.duration;
    if (seconds !== undefined) {
      setDuration(seconds);
    }

    if (progressBar?.current?.max !== undefined && seconds !== undefined) {
      progressBar.current.max = seconds.toString();
    }
  }, [videoPlayer?.current?.onloadedmetadata, videoPlayer?.current?.readyState]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (videoPlayer.current != undefined && animationRef !== undefined) {
      if (!prevValue) {
        videoPlayer.current.onended = handleEndOfPlaying;
        videoPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        videoPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const handleEndOfPlaying = () => {
    setIsPlaying(false);
    if (videoPlayer.current != null && animationRef !== null) {
      progressBar.current!.value = "0";
      changeRange();
      cancelAnimationFrame(animationRef.current!);
    }
  };

  const whilePlaying = () => {
    if (videoPlayer?.current === null) {
      return;
    }
    progressBar.current!.value = videoPlayer.current.currentTime.toString();
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    if (videoPlayer.current != undefined && progressBar.current !== undefined) {
      videoPlayer.current.currentTime = progressBar.current?.valueAsNumber!;
      changePlayerCurrentTime();
    }
  };

  const changePlayerCurrentTime = () => {
    if (videoPlayer.current != undefined && progressBar.current !== undefined) {
      progressBar.current!.style.setProperty(
        "--seek-before-width",
        `${(progressBar.current!.valueAsNumber / duration) * 100}%`
      );
    }
  };

  return (
    <div className={styles.playerContainer}>
      <video className={styles.videoElement} ref={videoPlayer} preload="metadata" width={"100%"}>
        <source src={videoSrcUrl} type="video/mp4"></source>
      </video>
      <div className={styles.controlPanel}>
        <button onClick={togglePlayPause} className={styles.playPause}>
          {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
        </button>

        {/* progress bar */}
        <div className={styles.progressBarContainer}>
          <input
            type="range"
            step="0.05"
            className={styles.progressBar}
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
