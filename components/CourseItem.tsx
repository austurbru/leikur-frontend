import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Label } from "semantic-ui-react";
import AuthContext from "@context/AuthContext";
import { Level } from "@models/strapi-types";
import styles from "@styles/CourseItem.module.css";

interface Props {
  course: Level;
}

const CourseItem: React.FC<Props> = ({ course }: Props) => {
  const { user } = useContext(AuthContext);
  let progress = 0;

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
        <p>{course.description}</p>
        {/* Showing progress only if it is greater than 0 */}
        <p>{progress > 0 && `Progress: ${progress}%`}</p>
      </div>
      <div className={styles.link}>
        <Link href={`/courses/${course.levelNo}`}>
          <a className="btn">Go to Course</a>
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
