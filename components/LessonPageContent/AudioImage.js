import Image from "next/image";
import { AudioPlayer } from "./AudioPlayer";
import styles from "@styles/LessonPageContent/AudioImage.module.css";

const AudioImage = ({ imageSrcUrl, audioSrcUrl, altText }) => {
  return (
    <div>
      <Image
        src={imageSrcUrl}
        layout='responsive'
        width={500}
        height={281}
        alt={altText}
        className={styles.topCornersRounded}
      />
      <AudioPlayer
        audioSrcUrl={audioSrcUrl}
        useRoundedAllCorners={false}
        UseRoundedCornersBottom={true}
      />
    </div>
  );
};

export default AudioImage;
