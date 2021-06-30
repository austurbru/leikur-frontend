import { useState } from "react";
import { Feedback } from "@models/enums"

import LessonPageLayout from "@components/LessonPageLayout";
import LessonNavigation from "@components/LessonNavigation";
import ReactMarkdown from "react-markdown";

import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import "../node_modules/video-react/dist/video-react.css";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const SuperSimplePage: React.FC<Props> = ({ page, navSlugs }: Props) => {
  const [feedback, setFeedback] = useState<Feedback>(Feedback.None);
  const [progress, setProgress] = useState<number>( (page.pageInfo.pageNo - 1) * 100 / page.pageInfo.lessonTotalPageCount);


  return (
    <div>
      <LessonPageLayout>
        <div>
          <button onClick={() => setFeedback(Feedback.Correct)}>Send Correct</button>
          <button onClick={() => setFeedback(Feedback.Incorrect)}>Send Wrong</button>
          <button onClick={() => setFeedback(Feedback.Hide)}>Hide</button>
          <button onClick={() => setProgress( (page.pageInfo.pageNo) * 100 / page.pageInfo.lessonTotalPageCount)}>Complete Page</button>
          <p>{`Progress: ${progress}%`}</p>
          <p>{`Page: ${page.pageInfo.pageNo} of ${page.pageInfo.lessonTotalPageCount}`}</p>
          <h3>{page.title}</h3>
          <div>
            <div>
              <ReactMarkdown>{page.content}</ReactMarkdown>
            </div>
          </div>
        </div> 
        <LessonNavigation navSlugs={navSlugs} feedback={feedback} />
      </LessonPageLayout>
    </div>
  );
};

export default SuperSimplePage;
