import { useContext } from "react";
import { Level } from "@models/strapi-types";
import AuthContext from "@context/AuthContext";
import CourseCard from "@components/CourseCard";

// styles
import styles from "@styles/CourseItem.module.css";

interface Props {
  course: Level;
}

const CourseItem = ({ course }: Props) => {
  const { user } = useContext(AuthContext);

  // Showing courses only if user is logged in
  if (!user) return null;

  const courseColor = `var(--${course.color.toLowerCase()})`;
  return (
    <div className={styles.gridContainer}>
      <div className={styles.leftColumn} style={{ color: courseColor }}>
        {course.levelNo}
      </div>
      <CourseCard course={course} />
    </div>
  );
};

export default CourseItem;
