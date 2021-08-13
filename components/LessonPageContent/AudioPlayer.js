import React, { useState, useRef, useEffect } from "react";
import styles from "@styles/LessonPageContent/AudioPlayer.module.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { RoundedCorners } from "@models/enums";


// interface Props {
//   audioSrcUrl: string;
//   roundedCorners: RoundedCorners;
// }
const AudioPlayer = ({ audioSrcUrl, roundedCorners}) => {
//const AudioPlayer = ({ audioSrcUrl, roundedCorners}: Props) => {

  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  // references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation
  // const audioPlayer = useRef<HTMLAudioElement>(null); // reference our audio component
  // const progressBar = useRef<HTMLInputElement>(null); // reference our progress bar
  // const animationRef = useRef(); // reference the animation

  useEffect(() => {
    const seconds = audioPlayer?.current?.duration;
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState]);

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

/*   const getPlayerStyling = () => {
    let styling = `${styles.audioPlayer} `;
    if (false) {
      let styling = styling + `${styles.audioPlayerBorderRadius}`;
      console.log(styling);
      return styling;
    }
    if (true) {
      let styling = styling + `${styles.audioPlayerBorderRadiusBottom}`;
      return styling;
    }

  }; */

  let playerStyling = `${styles.audioPlayer}`;

  if (roundedCorners === RoundedCorners.Bottom) {
    playerStyling = `${styles.audioPlayer} ${styles.audioPlayerBorderRadiusBottom}`;
  }

  if (roundedCorners === RoundedCorners.All) {
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
