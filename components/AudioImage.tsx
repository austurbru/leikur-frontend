import Image from "next/image";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "@styles/AudioImage.module.css";

interface Props {
  imageUrl: string;
  audioUrl: string;
}

const AudioImage: React.FC<Props> = ({ imageUrl, audioUrl }: Props) => {


return (

  <div>
    <Image
      src={imageUrl}
      layout='responsive'
      width={500}
      height={281}
      alt='Picture of the author'
    />

    <div className={styles.playerContainer}>
      <AudioPlayer
        src={audioUrl}
        layout='horizontal-reverse'
        customAdditionalControls={[]}
        customVolumeControls={[]}
        showJumpControls={false}
      />
    </div>
  </div>
);
};

export default AudioImage;
