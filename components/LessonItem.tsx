import { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Grid } from "semantic-ui-react";
import { Lesson } from "@models/strapi-types";
import styles from "@styles/LessonItem.module.css";
import AuthContext from "@context/AuthContext";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import ProgressBar from "./LessonPageContent/ProgressBar";

const LessonItem: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const router = useRouter();
  const { setCurrentLesson } = useContext(AuthContext);

  //const { user, setCurrentLesson } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);


  // const levelKey = lesson.key.charAt(0);
  // const lessonNumber = lesson.key.charAt(2);

  // let isCompleted = false;
  // if (user) {
  //   const filterResult = user!.lessonsCompleted.filter((item) => {
  //     return item.charAt(0) === levelKey && item.charAt(2) === lessonNumber;
  //   });

  //   isCompleted = filterResult.length > 0;
  // }

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

  const progress = 30

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
                src={lesson.image ? lesson.image.formats.thumbnail.url : "/images/event-default.png"}
                width={170}
                height={100}
              />
{/*               {isCompleted && (
                <Label style={{ top: "-115px", left: "-12px" }} ribbon color="green" content="Completed" />
              )} */}
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
            {/*             <Grid.Row>
              <div className={styles.ProgressBarContainer}>
                <ProgressBar bgcolor={"blue"} height={10} completed={33}></ProgressBar>
              </div>
            </Grid.Row> */}

            <Grid.Row>
              <div className={styles.progressContainer}>
                <div className={styles.progressBarContainer}>
                  <ProgressBar bgcolor={"blue"} height={10} completed={progress}></ProgressBar>
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
                      Start lesson
                    </Button>
                  </div>
                ) : (
                  /*                   <Button color={lessonColor} loading={isLoading} onClick={handleStartLesson}>
                    Begin Lesson
                  </Button> */
                  "Lesson is currently without content"
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
