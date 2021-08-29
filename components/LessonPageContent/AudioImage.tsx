import Image from "next/image";
import AudioPlayer from "@components/LessonPageContent/AudioPlayer";
import { RoundedCorners } from "@models/enums";
import styles from "@styles/LessonPageContent/AudioImage.module.css";

interface Props {
  imageSrcUrl: string;
  blurredImage: string;
  audioSrcUrl: string;
  altText: string;
}

const AudioImage = ({ imageSrcUrl, blurredImage, audioSrcUrl, altText }: Props) => {
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
      <AudioPlayer audioSrcUrl={audioSrcUrl} roundedCorners={RoundedCorners.Bottom} />
    </div>
  );
};

export default AudioImage;
