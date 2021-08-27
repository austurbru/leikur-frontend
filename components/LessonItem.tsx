import { useContext, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { Button, Grid } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import { Lesson } from "@models/strapi-types";
import AuthContext from "@context/AuthContext";
import ProgressBar from "@components/LessonPageContent/ProgressBar";
import styles from "@styles/LessonItem.module.css";

interface Props {
  lesson: Lesson;
}

const LessonItem = ({ lesson }: Props) => {
  let { t } = useTranslation();
  const router = useRouter();
  const { user, setCurrentLesson } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [slug, setSlug] = useState(`/lessons/${lesson?.pages[0]?.pageInfo.slug}`);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const levelKey = lesson.key.charAt(0);
    const lessonNumber = lesson.key.charAt(2);

    //let progress = 0;
    if (user) {
      try {
        console.log("user!.lessonsCompleted:");
        console.log(user!.lessonsCompleted);
        const filterResult = user!.lessonsCompleted
          .filter(function (x) {
            return x !== undefined && x !== null;
          })
          .filter((item) => {
            return item.charAt(0) === levelKey && item.charAt(2) === lessonNumber;
          });

        if (filterResult.length > 0) {
          setProgress(100);
        }

        if (user!.currentPageSlug !== null && user!.currentPageSlug.length > 0) {
          const slugArray = user.currentPageSlug.split("-");
          const currentPageLessonKey = slugArray[0] + "-" + slugArray[1];

          console.log(currentPageLessonKey);
          console.log(`The user!.currentPageSlug is: ${user!.currentPageSlug}`);
          console.log(`The user!.currentLessonProgress is: ${user!.currentLessonProgress}`);
          if (currentPageLessonKey === `lessons/${lesson.key}`) {
            setProgress(user!.currentLessonProgress);
            setSlug(`/${user!.currentPageSlug}`);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [slug]);

  //handleStartLesson will navigate to the lesson and set the lesson
  //as the current lesson for the user
  const handleStartLesson = () => {
    setIsLoading(true);
    setCurrentLesson(lesson);
    router.push(slug);
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

  console.log(`The slug is: ${slug}`);
  return (
    <div className={styles.lesson}>
      {/* Grid system */}
      {/* ----here starts the grid-------------------------------------------------- */}

      <Grid stackable columns={3}>
        {/* Here starts the first row-------------------------------------------------------- */}
        <Grid.Row>
          {/* Here starts the first column of 4-------------------------------------------------------- */}
          <Grid.Column width={4}>
            <div className={styles.img}>
              <Image
                src={lesson.image ? lesson.image.formats.thumbnail.url : "/images/default.png"}
                width={170}
                height={100}
              />
            </div>
          </Grid.Column>
          {/* Here finishes the first column of 4-------------------------------------------------------- */}

          {/* Here starts the second column of 8-------------------------------------------------------- */}
          <Grid.Column width={8}>
            <Grid.Row>
              <div className={styles.lessonTitle}>{lesson.title}</div>
            </Grid.Row>
            <Grid.Row>
              <p>{lesson.description}</p>
            </Grid.Row>
            {/*             <div className={styles.info}>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
            </div> */}
          </Grid.Column>
          {/* Here finishes the second column of 8-------------------------------------------------------- */}

          {/* Here starts the third column of 4-------------------------------------------------------- */}
          <Grid.Column width={4}>
            <Grid.Row>
              <div className={styles.progressContainer}>
                <div className={styles.progressBarContainer}>
                  <ProgressBar height={10} completed={progress}></ProgressBar>
                </div>
                <div className={styles.progressText}>
                  <p>{Math.round(progress)}%</p>
                </div>
              </div>
            </Grid.Row>

            <Grid.Row>
              <div>
                {lesson.pages && lesson.pages.length > 0 ? (
                  <div className={styles.buttonContainer}>
                    <Button color={lessonColor} loading={isLoading} onClick={handleStartLesson}>
                      {t("common:beginLesson")}
                    </Button>
                  </div>
                ) : (
                  t("common:noLessonContent")
                )}
              </div>
            </Grid.Row>
          </Grid.Column>
          {/* Here finishes the third column of 4-------------------------------------------------------- */}
        </Grid.Row>
        {/* Here finishes the first row-------------------------------------------------------- */}
      </Grid>
    </div>
    //-----here finishes the grid--------------------------------------------------
  );
};

export default LessonItem;
