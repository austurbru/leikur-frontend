import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import { Feedback } from "@models/enums";
import AudioImage from "@components/LessonPageContent/AudioImage";
import LessonPageWrapper from "../LessonPageWrapper";

import styles from "@styles/BasicPageTemplate.module.css";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const ShortTextWithTranslation: React.FC<Props> = ({ page, navSlugs }: Props) => {

  return (
    <LessonPageWrapper
      page={page}
      navSlugs={navSlugs}
      canContinue={true}
      feedback={Feedback.None}
      notifyCannotContinue={() => {}}
    >
      
      <div className={styles.mainContent}>
            <div className={styles.audioImageContainer}>
        <AudioImage imageSrcUrl={page.image?.url} audioSrcUrl={page.audio.url} altText="Some alt text"></AudioImage>
      </div>
      <h2>Góðan daginn</h2>
      <i>Good morning/good day</i>
      </div>
    </LessonPageWrapper>
  );
};

export default ShortTextWithTranslation;
