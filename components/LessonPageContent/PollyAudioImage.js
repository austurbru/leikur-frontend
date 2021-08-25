import Image from "next/image";
import { PollyAudioPlayer } from "./PollyAudioPlayer";
import styles from "@styles/LessonPageContent/AudioImage.module.css";
import { RoundedCorners } from "@models/enums";

const PollyAudioImage = ({ imageSrcUrl, pollyText, isFemaleVoice, altText }) => {
  return (
    <div>
      <Image
        src={imageSrcUrl}
        layout="responsive"
        width={500}
        height={281}
        alt={altText}
        className={styles.topCornersRounded}
      />
      <PollyAudioPlayer
        textForSpeech={pollyText}
        roundedCorners={RoundedCorners.Bottom}
        isFemaleVoice={isFemaleVoice}
      />
    </div>
  );
};
export default PollyAudioImage;
