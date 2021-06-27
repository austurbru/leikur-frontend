import { useState } from "react";
import { Feedback } from "@models/enums";

import LessonPageLayout from "@components/LessonPageLayout";
import LessonNavigation from "@components/LessonNavigation";
import ReactMarkdown from "react-markdown";
import {
  Player,
  ControlBar,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  ClosedCaptionButton,
  BigPlayButton,
} from "video-react";
import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import "../node_modules/video-react/dist/video-react.css";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const TextWithImageAndVideo: React.FC<Props> = ({ page, navSlugs }: Props) => {
  const [feedback, setFeedback] = useState<Feedback>(Feedback.None);

  return (
    <div>
      <LessonPageLayout>
        <div>
          <button onClick={() => setFeedback(Feedback.Correct)}>Send Correct</button>
          <button onClick={() => setFeedback(Feedback.Incorrect)}>Send Wrong</button>
          <button onClick={() => setFeedback(Feedback.Hide)}>Hide</button>
          <h3>{page.title}</h3>
          <div>
            <div>
              <Player>
                <source src={page.video.url} />
                <BigPlayButton position="center" />
                <ControlBar>
                  <VolumeMenuButton />
                  <CurrentTimeDisplay order={4.1} />
                  <TimeDivider order={4.2} />
                  <ClosedCaptionButton order={7.1} />
                  <PlaybackRateMenuButton rates={[2, 1, 0.5]} order={7.2} />
                </ControlBar>
              </Player>
            </div>
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

export default TextWithImageAndVideo;
