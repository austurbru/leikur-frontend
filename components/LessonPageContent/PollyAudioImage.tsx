import Image from "next/image";
import { RoundedCorners } from "@models/enums";
import PollyAudioPlayer from "@components/LessonPageContent/PollyAudioPlayer";
import styles from "@styles/LessonPageContent/AudioImage.module.css";

interface Props {
  imageSrcUrl: string;
  blurredImage: string;
  pollyText: string;
  isFemaleVoice: boolean;
  altText: string;
}

const PollyAudioImage = ({ imageSrcUrl, blurredImage, pollyText, isFemaleVoice, altText }: Props) => {

  return (
    <div>
      <Image
        src={imageSrcUrl}
        layout="responsive"
        width={500}
        height={281}
        alt={altText}
        placeholder="blur"
        blurDataURL={blurredImage}
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
