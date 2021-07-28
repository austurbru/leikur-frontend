import { useState, useContext } from "react";

import AudioImage from "@components/AudioImage";


import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import styles from "@styles/BasicPageTemplate.module.css";

import LessonPageWrapper from "@components/LessonPageWrapper";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const SuperSimplePage: React.FC<Props> = ({ page, navSlugs }: Props) => {

  const [canContinue, setCanContinue] = useState(true);


  const audioUrl = "https://res.cloudinary.com/dkgrjtewg/video/upload/v1621382141/thjodhatid_f96264cf46.mp3";
  const imageUrl = "https://res.cloudinary.com/dkgrjtewg/image/upload/v1621382033/small_tjh1986_8824b6d8d3.jpg";

  return (
    <LessonPageWrapper page={page} navSlugs={navSlugs} canContinue={canContinue}>
      <div>
        <h3>{page.title}</h3>
        <div className={styles.audioImageContainer}>
          <AudioImage imageUrl={imageUrl} audioUrl={audioUrl}></AudioImage>
        </div>
      </div>
    </LessonPageWrapper>
  );

  // return (
  //   <div className={styles.container}>
  //     <LessonPageHeader progress={progress} slug={page.pageInfo.slug}></LessonPageHeader>
  //     <LessonPageLayout>
  //       <div className={styles.info}></div>
  //       <div>
  //         <h3>{page.title}</h3>
  //         <div className={styles.audioImageContainer}>
  //           <AudioImage imageUrl={imageUrl} audioUrl={audioUrl}></AudioImage>
  //         </div>
  //       </div>
  //       <LessonNavigation navSlugs={navSlugs} feedback={feedback} notifyContinue={handleContinueNotification} />
  //     </LessonPageLayout>
  //   </div>
  // );
};

export default SuperSimplePage;
