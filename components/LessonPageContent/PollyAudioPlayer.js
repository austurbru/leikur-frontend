import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "@styles/LessonPageContent/AudioPlayer.module.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { RoundedCorners } from "@models/enums";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { Polly } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";

const PollyAudioPlayer = ({ textForSpeech, roundedCorners, isFemaleVoice }) => {

  if(isFemaleVoice){
    console.log("Female")
  } else {
    console.log("Male")
  }

  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioIsLoaded, setaudioIsLoaded] = useState(false);

  // references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  useEffect(() => {
    if (audioIsLoaded) {
      return;
    }
    async function fetchData() {
      await LoadAudio();
    }
    fetchData();
    const seconds = audioPlayer.current.duration;
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioIsLoaded]);

  const LoadAudio = useCallback(async () => {
    if (audioIsLoaded) {
      return;
    }

    const client = new Polly({
      region: "eu-west-2",
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: "eu-west-2" }),
        identityPoolId: "eu-west-2:a656aa0a-7269-4433-a3e2-b9dd9c347c1c", // IDENTITY_POOL_ID
      }),
    });

    var voice = isFemaleVoice ? "Dora" : "Karl";
    var speechParams = {
      OutputFormat: "mp3",
      SampleRate: "16000",
      Text: { textForSpeech },
      TextType: "text",
      VoiceId: voice,
    };

    speechParams.Text = textForSpeech;

    try {
      let url = await getSynthesizeSpeechUrl({
        client,
        params: speechParams,
      });
      setAudioUrl(url);

      console.log(url);

      audioPlayer.current.LoadAudio;
      const seconds = audioPlayer.current.duration;
      setDuration(seconds);
      progressBar.current.max = seconds;
      setaudioIsLoaded(true);
    } catch (err) {
      console.log("Error", err);
    }
  }, []);

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
    if (audioPlayer?.current === null) {
      return;
    }
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty("--seek-before-width", `${(progressBar.current.value / duration) * 100}%`);
  };

  let playerStyling = `${styles.audioPlayer}`;

  if (roundedCorners === RoundedCorners.Bottom) {
    playerStyling = `${styles.audioPlayer} ${styles.audioPlayerBorderRadiusBottom}`;
  }

  if (roundedCorners === RoundedCorners.All) {
    playerStyling = `${styles.audioPlayer} ${styles.audioPlayerBorderRadius}`;
  }

  const handlePlayerReady = () => {
    console.log("PlayerReady");
    const seconds = audioPlayer.current.duration;
    setDuration(seconds);
    progressBar.current.max = seconds;
    audioPlayer.current.onended = handleEndOfPlaying;
  };

  return (
    <div className={playerStyling}>
      <audio ref={audioPlayer} src={audioUrl} preload="metadata" onCanPlay={handlePlayerReady}></audio>

      {audioIsLoaded === false && (
        <button onClick={togglePlayPause} className={styles.playPause}>
          <VscLoading className={styles.play} />
        </button>
      )}

      {audioIsLoaded === true && (
        <button onClick={togglePlayPause} className={styles.playPause}>
          {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
        </button>
      )}

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

export { PollyAudioPlayer };
