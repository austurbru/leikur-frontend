import { PagesEntity } from "@models/strapi-types";
import { VideoPlayer } from "@components/LessonPageContent/VideoPlayer";
import { AudioPlayer } from "@components/LessonPageContent/AudioPlayer";
import AudioImage from "@components/LessonPageContent/AudioImage";
import { RoundedCorners } from "@models/enums";
import PageImage from "@components/LessonPageContent/PageImage";
import styles from "@styles/LessonPageContent/MediaContainer.module.css";

interface Props {
  page: PagesEntity;
}

const MediaContainer: React.FC<Props> = ({ page }: Props) => {
  enum MediaType {
    None,
    Image,
    Audio,
    ImageAndAudio,
    Video,
  }

  let mediaType = MediaType.None;
  let imageUrl = "";
  let audioUrl = "";
  let videoUrl = "";
  let altText = "";

  if (page.media === undefined || page.media === null) {
    mediaType = MediaType.None;
  } else if (page.media.video !== undefined && page.media.video !== null) {
    mediaType = MediaType.Video;
    videoUrl = page.media.video.url;
  } else if (
    page.media.image !== undefined &&
    page.media.image !== null &&
    page.media.audio !== undefined &&
    page.media.audio !== null
  ) {
    mediaType = MediaType.ImageAndAudio;
    imageUrl = page.media.image.url;
    audioUrl = page.media.audio.url;
    altText = page.media.image.alternativeText;
  } else if (
    page.media.image !== undefined &&
    page.media.image !== null &&
    (page.media.audio === undefined || page.media.audio === null)
  ) {
    mediaType = MediaType.Image;
    imageUrl = page.media.image.url;
    altText = page.media.image.alternativeText;
  } else if (
    page.media.audio !== undefined &&
    page.media.audio !== null &&
    (page.media.image === undefined || page.media.image === null)
  ) {
    mediaType = MediaType.Audio;
    audioUrl = page.media.audio.url;
  }

  return (
    <div className={styles.mediaContainer}>
      <div>{mediaType === MediaType.Video && <VideoPlayer videoSrcUrl={videoUrl} />}</div>
      <div>
        {mediaType === MediaType.ImageAndAudio && (
          <AudioImage imageSrcUrl={imageUrl} audioSrcUrl={audioUrl} altText={altText} />
        )}
      </div>
      <div>
        {mediaType === MediaType.Audio && <AudioPlayer audioSrcUrl={audioUrl} roundedCorners={RoundedCorners.All} />}
      </div>
      <div>{mediaType === MediaType.Image && <PageImage imageSrcUrl={imageUrl} altText={altText} />}</div>
    </div>
  );
};

export default MediaContainer;
