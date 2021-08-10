import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import { Feedback } from "@models/enums";
import  TextCard  from "@components/LessonPageContent/TextCard"
import LessonPageWrapper from "../LessonPageWrapper";

import styles from "@styles/BasicPageTemplate.module.css";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const InstructionsAndText: React.FC<Props> = ({ page, navSlugs }: Props) => {

  return (
    <LessonPageWrapper
      page={page}
      navSlugs={navSlugs}
      canContinue={true}
      feedback={Feedback.None}
      notifyCannotContinue={() => {}}
    >
      
      <div className={styles.mainContent}>
      <TextCard content={page.content} />
      </div>
    </LessonPageWrapper>
  );
};

export default InstructionsAndText;
