import { useState, useEffect } from "react";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import styles from "@styles/LessonPageContent/AudioExampleButton.module.css";

const AudioExampleButton = (props: { audioSrcUrl: string }) => {
  const { audioSrcUrl } = props;

  const [audio] = useState(typeof Audio !== "undefined" ? new Audio(audioSrcUrl) : null);

  useEffect(() => {
    if (audio) {
      audio.onended = () => {
        setIsPlaying(false);
      };
    }
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    if (audio) {
      audio.play();
    }
  };

  const pause = () => {
    if (audio) {
      audio.pause();
    }
  };

  const audioIconStyle = {
    width: "1.75rem",
    height: "1.75rem",
    marginLeft: "3px",
    borderRadius: "50%",
    backgroundColor: "white",
  };

  const togglePlayPause = () => {
    const newIsPlayingValue = !isPlaying;
    setIsPlaying(newIsPlayingValue);

    if (newIsPlayingValue) {
      play();
    } else {
      pause();
    }
  };

  return (
    <div className={styles.container} onClick={togglePlayPause}>
      Example
      {isPlaying ? <GiSpeaker style={audioIconStyle} /> : <GiSpeakerOff style={audioIconStyle} />}
    </div>
  );
};

export default AudioExampleButton;
