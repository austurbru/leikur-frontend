import { PagesEntity } from "@models/strapi-types";
import { VideoPlayer } from "@components/LessonPageContent/VideoPlayer";
import { AudioPlayer } from "@components/LessonPageContent/AudioPlayer";
import AudioImage from "@components/LessonPageContent/AudioImage";
import { RoundedCorners } from '@models/enums';
import PageImage from "@components/LessonPageContent/PageImage";
import styles from "@styles/LessonPageContent/MediaContainer.module.css";

interface Props {
  page: PagesEntity;
}

const MediaContainer: React.FC<Props> = ({ page }: Props) => {

 console.log(page)
 console.log(page.image)

  return (
    <div className={styles.mediaContainer}>
      <div>
        {page.video !== undefined && <VideoPlayer videoSrcUrl={page.video.url} />}
      </div>
      <div>
        {page.image !== undefined && page.audio !== undefined && (
          <AudioImage 
          imageSrcUrl={page.image.url} 
          audioSrcUrl={page.audio.url} 
          altText={page.image.alternativeText} />
        )}
      </div>
      <div>
        {page.image === undefined && page.audio !== undefined  && (
          <AudioPlayer 
          audioSrcUrl={page.audio.url} 
          roundedCorners={RoundedCorners.All} />
        )}
      </div>
      <div>
        {page.image !== undefined && page.audio === undefined && (
          <PageImage 
          imageSrcUrl={page.image.url} 
          altText={page.image.alternativeText} />
        )}
      </div>
    </div>
  );
};

export default MediaContainer;
