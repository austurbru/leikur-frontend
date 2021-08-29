import { RoundedCorners } from "@models/enums";
import { PagesEntity } from "@models/strapi-types";
import VideoPlayer from "@components/LessonPageContent/VideoPlayer";
import AudioPlayer from "@components/LessonPageContent/AudioPlayer";
import PollyAudioPlayer from "@components/LessonPageContent/PollyAudioPlayer";
import PollyAudioImage from "@components/LessonPageContent/PollyAudioImage";
import AudioImage from "@components/LessonPageContent/AudioImage";
import PageImage from "@components/LessonPageContent/PageImage";
import styles from "@styles/LessonPageContent/MediaContainer.module.css";

interface Props {
  page: PagesEntity;
}

const MediaContainer = ({ page }: Props) => {
  enum MediaType {
    None,
    Image,
    Audio,
    PollyAudio,
    ImageAndAudio,
    PollyImageAndAudio,
    Video,
  }

  let mediaType = MediaType.None;
  let imageUrl = "";
  let audioUrl = "";
  let videoUrl = "";
  let altText = "";
  let pollyText = "";
  let isFemaleVoice = false;

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
    (page.media.audio === undefined || page.media.audio === null) &&
    page.media.pollyText !== null
  ) {
    mediaType = MediaType.PollyImageAndAudio;
    imageUrl = page.media.image.url;
    pollyText = page.media.pollyText!;
    isFemaleVoice = page.media?.pollyVoice === "Female";
    altText = page.media.image.alternativeText;
  } else if (
    page.media.image !== undefined &&
    page.media.image !== null &&
    (page.media.audio === undefined || page.media.audio === null) &&
    page.media.pollyVoice === null
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
  } else if (
    page.media.audio === undefined &&
    page.media.audio === null &&
    page.media.pollyVoice !== null &&
    (page.media.image === undefined || page.media.image === null)
  ) {
    mediaType = MediaType.PollyAudio;
    pollyText = page.media.pollyText!;
    isFemaleVoice = page.media?.pollyVoice === "Female";
  }

  return (
    <div className={styles.mediaContainer}>
      <div>{mediaType === MediaType.Video && <VideoPlayer videoSrcUrl={videoUrl} />}</div>
      <div>
        {mediaType === MediaType.ImageAndAudio && (
          <AudioImage
            imageSrcUrl={page.media?.image?.url!}
            blurredImage={page.blurredImage}
            audioSrcUrl={audioUrl}
            altText={page.media?.image?.alternativeText ? page.media?.image?.alternativeText : ""}
          />
        )}
      </div>
      <div>
        {mediaType === MediaType.Audio && <AudioPlayer audioSrcUrl={audioUrl} roundedCorners={RoundedCorners.All} />}
      </div>
      <div>
        {mediaType === MediaType.PollyImageAndAudio && (
          <PollyAudioImage
            imageSrcUrl={page.media?.image?.url!}
            blurredImage={page.blurredImage}
            pollyText={pollyText}
            isFemaleVoice={isFemaleVoice}
            altText={page.media?.image?.alternativeText ? page.media?.image?.alternativeText : ""}
          />
        )}
      </div>
      <div>
        {mediaType === MediaType.PollyAudio && (
          <div>
            <PollyAudioPlayer textForSpeech={pollyText} roundedCorners={RoundedCorners.All} isFemaleVoice={true} />
          </div>
        )}
      </div>
      <div>
        {mediaType === MediaType.Image && (
          <PageImage imageSrcUrl={imageUrl} blurredImage={page.blurredImage} altText={altText} />
        )}
      </div>
    </div>
  );
};

export default MediaContainer;
