import { useContext } from "react";
import useTranslation from "next-translate/useTranslation";
import AuthContext from "@context/AuthContext";
import { Level } from "@models/strapi-types";
import ProgressBar from "@components/LessonPageContent/ProgressBar";
import RouteButton from "@components/RouteButton";

import styles from "../styles/CourseCard.module.css";

interface Props {
  course: Level;
}

const CourseCard = ({ course }: Props) => {
  const { user } = useContext(AuthContext);
  let { t } = useTranslation();

  const courseColor = `var(--${course.color.toLowerCase()})`;
  const buttonText = t("common:beginCourse");
  let progress = 0;

  if (user) {
    const lessonCount = course.lessons.length;
    const lessonsCompleted = user!.lessonsCompleted?.filter((item) => {
      return item.charAt(0) === course.levelNo.toString();
    });

    if (lessonsCompleted && lessonCount > 0) {
      progress = Math.floor((lessonsCompleted.length / lessonCount) * 100);
    } else {
      progress = 0;
    }

    if (progress > 100) {
      progress = 100;
    }
  }

  return (
    <>
      <div className={styles.card} style={{ borderColor: courseColor }}>
        <div className={styles.progressContainer}>
          <div className={styles.progressBarContainer}>
            <ProgressBar height={10} completed={progress}></ProgressBar>
          </div>
          <div className={styles.progressText}>
            <p>{Math.round(progress)}%</p>
          </div>
        </div>
        <h3 style={{ margin: "0", marginTop: "10px" }}>{course.title}</h3>
        {course.description}
        <RouteButton color={course.color} content={buttonText} destination={`/courses/${course.levelNo}`} />
      </div>
    </>
  );
};

export default CourseCard;
