import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import { Feedback } from "@models/enums";
import MediaContainer from "@components/LessonPageContent/MediaContainer";
import LessonPageWrapper from "@components/LessonPageWrapper";

import styles from "@styles/LessonPageTemplates/ShortTextWithTranslation.module.css";
import TextAndTranslation from '../LessonPageContent/TextAndTranslation';

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const ShortTextWithTranslation: React.FC<Props> = ({ page, navSlugs }: Props) => {
  console.log(page.audio?.url);
  return (
    <LessonPageWrapper
      page={page}
      navSlugs={navSlugs}
      canContinue={true}
      feedback={Feedback.None}
      notifyCannotContinue={() => {}}
    >
      <div className={styles.mainContent}>
        <MediaContainer page={page} />
        <TextAndTranslation shortText={"Góðan daginn"} translation={"Good morning/good day"}/>
      </div>
    </LessonPageWrapper>
  );
};

export default ShortTextWithTranslation;
