import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Label, Button, Grid } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import AuthContext from "@context/AuthContext";
import { Level } from "@models/strapi-types";
import ProgressBar from "@components/LessonPageContent/ProgressBar";
import styles from "@styles/CourseItem.module.css";

interface Props {
  course: Level;
}

const CourseItem: React.FC<Props> = ({ course }: Props) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  let progress = 0;

  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    const lessonCount = course.lessons.length;
    const lessonsCompleted = user!.lessonsCompleted.filter((item) => {
      console.log(item);
      if (!item) {
        console.log("item is null here!");
        console.log(lessonsCompleted);
      }
      return item.charAt(0) === course.levelNo.toString();
    });

    progress = Math.floor((lessonsCompleted.length / lessonCount) * 100);
  }

  const handleBeginCourse = () => {
    setIsLoading(true);
    router.push(`/courses/${course.levelNo}`);
  };

  let courseColor: SemanticCOLORS;
  switch (course.color.toLowerCase()) {
    case "yellow":
      courseColor = "yellow";
      break;
    case "red":
      courseColor = "red";
      break;
    case "green":
      courseColor = "green";
      break;
    case "blue":
      courseColor = "blue";
      break;
    default:
      courseColor = "yellow";
  }

  // Showing courses only if user is logged in
  if (!user) return null;

  return (
    <div className={styles.course}>
      <Grid stackable columns={3}>
        <Grid.Row>
          <Grid.Column width={4}>
            <div className={styles.img}>
              <Image
                src={course.image ? course.image.formats.thumbnail.url : "/images/event-default.png"}
                width={170}
                height={100}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <Grid.Row>
              <h3>{course.title}</h3>
            </Grid.Row>
            <Grid.Row>
              <p>{course.description}</p>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={4}>
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
            <Grid.Row> </Grid.Row>
            <Grid.Row>
              <div className={styles.buttonContainer}>
              <Button color={courseColor} loading={isLoading} onClick={handleBeginCourse}>
                Begin Course
              </Button>
              </div>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default CourseItem;

/*
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Label, Button } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import AuthContext from "@context/AuthContext";
import { Level } from "@models/strapi-types";
import ProgressBar from "@components/LessonPageContent/ProgressBar";
import styles from "@styles/CourseItem.module.css";

interface Props {
  course: Level;
}

const CourseItem: React.FC<Props> = ({ course }: Props) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  let progress = 0;

  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    const lessonCount = course.lessons.length;
    const lessonsCompleted = user!.lessonsCompleted.filter((item) => {
      console.log(item)
      if (!item){
        console.log("item is null here!")
        console.log(lessonsCompleted)
      }
      return item.charAt(0) === course.levelNo.toString();
    });

    progress = Math.floor((lessonsCompleted.length / lessonCount) * 100);
  }

  const handleBeginCourse = () => {
    setIsLoading(true); 
    router.push(`/courses/${course.levelNo}`);
  };

  let courseColor: SemanticCOLORS;
  switch (course.color.toLowerCase()) {
    case "yellow":
      courseColor = "yellow";
      break;
    case "red":
      courseColor = "red";
      break;
    case "green":
      courseColor = "green";
      break;
    case "blue":
      courseColor = "blue";
      break;
    default:
      courseColor = "yellow";
  }

  // Showing courses only if user is logged in
  if (!user) return null;

  return (
    <div className={styles.course}>
      <div className={styles.img}>
        <Image
          src={course.image ? course.image.formats.thumbnail.url : "/images/event-default.png"}
          width={170}
          height={100}
        />
        {progress === 100 && (
          <Label style={{ top: "-115px", left: "-12px" }} ribbon color="green" content="Completed" />
        )}
      </div>
      <div className={styles.info}>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
      </div>
      <div className={styles.ProgressBarContainer}>
      <ProgressBar bgcolor={"blue"} height={10} completed={progress}></ProgressBar>
      </div>  
      <Button color={courseColor} loading={isLoading} onClick={handleBeginCourse}>
            Begin Course
          </Button>
    </div>
  );
};

export default CourseItem;

*/
