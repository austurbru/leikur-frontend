import { PagesEntity } from "@models/strapi-types";
import { Feedback } from "@models/enums";
import NavSlugs from "@models/nav-slugs";
import MediaContainer from "@components/LessonPageContent/MediaContainer";
import LessonPageWrapper from "@components/LessonPageWrapper";
import TextAndTranslation from "@components/LessonPageContent/TextAndTranslation";
import AudioExample from "@components/LessonPageContent/AudioExample";
import styles from "@styles/LessonPageTemplates/ShortTextWithTranslation.module.css";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
  key: string;
}

const ShortTextWithTranslation = ({ page, navSlugs, key }: Props) => {
  if (key !== page.pageInfo.slug && key !== undefined) {
    console.error("The pageKey is not the page slug");
  }

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
        <TextAndTranslation
          shortText={page.textAndTranslation!.text}
          translation={page.textAndTranslation!.translation}
        />
        {page.audioExample !== undefined && page.audioExample !== null && (
          <AudioExample
            audioUrl={page.audioExample!.audio.url}
            shortText={page.audioExample!.text}
            translation={page.audioExample.translation}
          />
        )}
      </div>
    </LessonPageWrapper>
  );
};

export default ShortTextWithTranslation;
