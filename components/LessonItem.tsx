import { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Label, Button } from "semantic-ui-react";
import { Lesson } from "@models/strapi-types";
import styles from "@styles/LessonItem.module.css";
import AuthContext from "@context/AuthContext";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import ProgressBar from "./LessonPageContent/ProgressBar";

const LessonItem: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const router = useRouter();
  const { user, setCurrentLesson } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  let isCompleted = false;
  const levelKey = lesson.key.charAt(0);
  const lessonNumber = lesson.key.charAt(2);

  if (user) {
    const filterResult = user!.lessonsCompleted.filter((item) => {
      return item.charAt(0) === levelKey && item.charAt(2) === lessonNumber;
    });

    isCompleted = filterResult.length > 0;
  }

  //handleStartLesson will navigate to the lesson and set the lesson
  //as the current lesson for the user
  const handleStartLesson = () => {
    setIsLoading(true);
    setCurrentLesson(lesson);
    router.push(`/lessons/${lesson?.pages[0]?.pageInfo.slug}`);
  };

  let lessonColor: SemanticCOLORS;
  switch (lesson.color.toLowerCase()) {
    case "yellow":
      lessonColor = "yellow";
      break;
    case "red":
      lessonColor = "red";
      break;
    case "green":
      lessonColor = "green";
      break;
    case "blue":
      lessonColor = "blue";
      break;
    default:
      lessonColor = "yellow";
  }

  return (
    <div className={styles.lesson}>
      <div className={styles.img}>
        <Image
          src={lesson.image ? lesson.image.formats.thumbnail.url : "/images/event-default.png"}
          width={170}
          height={100}
        />
        {isCompleted && <Label style={{ top: "-115px", left: "-12px" }} ribbon color="green" content="Completed" />}
      </div>
      <div className={styles.info}>
        <h3>{lesson.title}</h3>
        <p>{lesson.description}</p>
      </div>

      <div className={styles.ProgressBarContainer}>
        <ProgressBar bgcolor={"blue"} height={10} completed={33}></ProgressBar>
      </div>
      <div>
        {lesson.pages && lesson.pages.length > 0 ? (
          <Button color={lessonColor} loading={isLoading} onClick={handleStartLesson}>
            Begin Lesson
          </Button>
        ) : (
          "Lesson is currently without content"
        )}
      </div>
    </div>
  );
};

export default LessonItem;

