import AudioExample from "@components/LessonPageContent/AudioExample";
import AudioImage from "@components/LessonPageContent/AudioImage";
import { AudioPlayer } from "@components/LessonPageContent/AudioPlayer";
import ProgressBar from "@components/LessonPageContent/ProgressBar";
import { VideoPlayer } from "@components/LessonPageContent/VideoPlayer";
import styles from "@styles/LessonPageContent/PlayerTester.module.css";

export default function PlayerTester() {
  return (
    <div className={styles.container}>
      <h1>My Custom SDF Player</h1>
      <br></br>
      <ProgressBar bgcolor={"var(--primary-app-color)"} height={7} completed={30} />
      <br></br>
      <AudioExample audioSrcUrl='https://www.w3schools.com/html/horse.mp3' />
      <br></br>

      <AudioPlayer
        audioSrcUrl='https://res.cloudinary.com/dkgrjtewg/video/upload/v1621382141/thjodhatid_f96264cf46.mp3'
        useRoundedAllCorners={true}
        UseRoundedCornersBottom={false}
      />

      <br></br>
      <VideoPlayer videoSrcUrl='https://res.cloudinary.com/dkgrjtewg/video/upload/v1621382269/matthew_eb85522262.mp4' />
      <br></br>
      <AudioImage
        audioSrcUrl='https://res.cloudinary.com/dkgrjtewg/video/upload/v1621382141/thjodhatid_f96264cf46.mp3'
        imageSrcUrl={
          "https://res.cloudinary.com/dkgrjtewg/image/upload/v1621382033/small_tjh1986_8824b6d8d3.jpg"
        }
        altText='sdfsdf'
      />
      <br></br>
    </div>
  );
}

//const Braversty = ({ audioSrcUrl, bgcolor }) => {

/*
  useRoundedAllCorners,
  UseRoundedCornersBottom,

      <Braversty
        audioSrcUrl='https://res.cloudinary.com/dkgrjtewg/video/upload/v1621382141/thjodhatid_f96264cf46.mp3'
        bgcolor='blue'
      />

       <AudioPlayer audioSrcUrl='https://res.cloudinary.com/dkgrjtewg/video/upload/v1621382141/thjodhatid_f96264cf46.mp3' />

         <AudioPlayer audioSrcUrl='https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3' />
    
*/
