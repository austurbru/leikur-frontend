import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { RoundedCorners } from "../../models/enums";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { Polly } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import styles from "@styles/LessonPageContent/AudioPlayer.module.css";

interface Props {
  textForSpeech: string;
  roundedCorners: RoundedCorners;
  isFemaleVoice: boolean;
}

const PollyAudioPlayer = ({ textForSpeech, roundedCorners, isFemaleVoice }: Props) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioIsLoaded, setaudioIsLoaded] = useState(false);

  // references
  const audioPlayer = useRef<HTMLAudioElement>(null); // reference our audio component
  const progressBar = useRef<HTMLInputElement>(null); // reference our progress bar
  const animationRef = useRef(0); // reference the animation

  useEffect(() => {
    if (audioIsLoaded) {
      return;
    }
    async function fetchData() {
      await LoadAudio();
    }
    fetchData();

    const seconds = audioPlayer?.current?.duration;
    if (seconds !== undefined) {
      setDuration(seconds);
    }

    if (progressBar?.current?.max !== undefined && seconds !== undefined) {
      progressBar.current.max = seconds.toString();
    }
  }, [audioIsLoaded]);

  const LoadAudio = useCallback(async () => {
    if (audioIsLoaded) {
      return;
    }

    const client = new Polly({
      region: "eu-west-2",
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: "eu-west-2" }),
        identityPoolId: process.env.NEXT_PUBLIC_POLLY_KEY ? process.env.NEXT_PUBLIC_POLLY_KEY : "", // IDENTITY_POOL_ID
      }),
    });

    var voice = isFemaleVoice ? "Dora" : "Karl";
    var speechParams = {
      OutputFormat: "mp3",
      SampleRate: "16000",
      Text: "",
      TextType: "text",
      VoiceId: voice,
    };

    speechParams.Text = textForSpeech;

    try {
      let url = await getSynthesizeSpeechUrl({
        client,
        params: speechParams,
      });

      setAudioUrl(url.toString());
      console.log(url.toString());

      audioPlayer.current?.load;

      const seconds = audioPlayer?.current?.duration;
      if (seconds !== undefined) {
        setDuration(seconds);
      }

      if (progressBar?.current?.max !== undefined && seconds !== undefined) {
        progressBar.current.max = seconds.toString();
        setaudioIsLoaded(true);
      }
    } catch (err) {
      console.log("Error", err);
    }
  }, []);

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

  const handlePlayerReady = () => {
    const seconds = audioPlayer?.current?.duration;
    if (seconds !== undefined) {
      setDuration(seconds);
    }

    if (
      progressBar?.current?.max !== undefined &&
      audioPlayer.current?.onended !== undefined &&
      seconds !== undefined
    ) {
      progressBar.current.max = seconds.toString();
      audioPlayer.current.onended = handleEndOfPlaying;
    }
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

export default PollyAudioPlayer;
