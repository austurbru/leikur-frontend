import React, { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { RoundedCorners } from "@models/enums";
import styles from "@styles/LessonPageContent/AudioPlayer.module.css";

interface Props {
  audioSrcUrl: string;
  roundedCorners: RoundedCorners;
}
const AudioPlayer = ({ audioSrcUrl, roundedCorners }: Props) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  // references
  const audioPlayer = useRef<HTMLAudioElement>(null); // reference our audio component
  const progressBar = useRef<HTMLInputElement>(null); // reference our progress bar
  const animationRef = useRef(0); // reference the animation

  useEffect(() => {
    const seconds = audioPlayer?.current?.duration;
    if (seconds !== undefined) {
      setDuration(seconds);
    }

    if (progressBar?.current?.max !== undefined && seconds !== undefined) {
      progressBar.current.max = seconds.toString();
    }
  }, [audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (audioPlayer.current != undefined && animationRef !== undefined) {
      if (!prevValue) {
        audioPlayer.current.onended = handleEndOfPlaying;
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const handleEndOfPlaying = () => {
    setIsPlaying(false);
    if (audioPlayer.current != null && animationRef !== null) {
      progressBar.current!.value = "0";
      changeRange();
      cancelAnimationFrame(animationRef.current!);
    }
  };

  const whilePlaying = () => {
    if (audioPlayer?.current === null) {
      return;
    }
    progressBar.current!.value = audioPlayer.current.currentTime.toString();
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    if (audioPlayer.current != undefined && progressBar.current !== undefined) {
      audioPlayer.current.currentTime = progressBar.current?.valueAsNumber!;
      changePlayerCurrentTime();
    }
  };

  const changePlayerCurrentTime = () => {
    if (audioPlayer.current != undefined && progressBar.current !== undefined) {
      progressBar.current!.style.setProperty(
        "--seek-before-width",
        `${(progressBar.current!.valueAsNumber / duration) * 100}%`
      );
    }
  };

  let playerStyling = `${styles.audioPlayer}`;

  if (roundedCorners === RoundedCorners.Bottom) {
    playerStyling = `${styles.audioPlayer} ${styles.audioPlayerBorderRadiusBottom}`;
  }

  if (roundedCorners === RoundedCorners.All) {
    playerStyling = `${styles.audioPlayer} ${styles.audioPlayerBorderRadius}`;
  }

  return (
    <div className={playerStyling}>
      <audio ref={audioPlayer} src={audioSrcUrl} preload="metadata"></audio>

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
  );
};

export default AudioPlayer;
