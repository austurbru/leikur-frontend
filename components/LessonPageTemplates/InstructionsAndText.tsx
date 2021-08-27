import ReactMarkdown from "react-markdown";
import { PagesEntity } from "@models/strapi-types";
import { Feedback } from "@models/enums";
import NavSlugs from "@models/nav-slugs";
import LessonPageWrapper from "@components/LessonPageWrapper";
import MediaContainer from "@components/LessonPageContent/MediaContainer";
import styles from "@styles/LessonPageTemplates/InstructionsAndText.module.css";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
  key: string;
}

const InstructionsAndText = ({ page, navSlugs, key }: Props) => {
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
        <div className={styles.markdownText}>
          <ReactMarkdown>{page.content}</ReactMarkdown>
        </div>
      </div>
    </LessonPageWrapper>
  );
};

export default InstructionsAndText;
