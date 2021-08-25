import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import { Feedback } from "@models/enums";
import ReactMarkdown from "react-markdown";
import MediaContainer from "@components/LessonPageContent/MediaContainer";
import LessonPageWrapper from "../LessonPageWrapper";

import styles from "@styles/LessonPageTemplates/InstructionsAndText.module.css";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
  key: string;
}

const InstructionsAndText: React.FC<Props> = ({ page, navSlugs, key }: Props) => {
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
