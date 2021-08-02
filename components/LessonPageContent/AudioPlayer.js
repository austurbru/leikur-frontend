import React, { useState, useRef, useEffect } from "react";
import styles from "@styles/LessonPageContent/AudioPlayer.module.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const AudioPlayer = ({
  audioSrcUrl,
  useRoundedAllCorners,
  UseRoundedCornersBottom,
}) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  // references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  useEffect(() => {
    const seconds = audioPlayer.current.duration;
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.onended = handleEndOfPlaying;
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
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
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
  };

  const getPlayerStyling = () => {
    let styling = `${styles.audioPlayer} `;
    if (false) {
      let styling = styling + `${styles.audioPlayerBorderRadius}`;
      console.log(styling);
      return styling;
    }
    if (true) {
      let styling = styling + `${styles.audioPlayerBorderRadiusBottom}`;
      console.log(styling);
      console.log(useRoundedAllCorners);
      console.log(UseRoundedCornersBottom);

      return styling;
    }
    console.log(styling);
    return styling;
  };

  let playerStyling = `${styles.audioPlayer}`;

  if (UseRoundedCornersBottom) {
    playerStyling = `${styles.audioPlayer} ${styles.audioPlayerBorderRadiusBottom}`;
  }

  if (useRoundedAllCorners) {
    playerStyling = `${styles.audioPlayer} ${styles.audioPlayerBorderRadius}`;
  }

  return (
    <div className={playerStyling}>
      <audio ref={audioPlayer} src={audioSrcUrl} preload='metadata'></audio>

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
  );
};

export { AudioPlayer };
