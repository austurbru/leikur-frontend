import Image from "next/image";
import Link from "next/link";
import { Level } from "@models/strapi-types";
import styles from "@styles/CourseItem.module.css";

interface Props {
  course: Level;
}

const CourseItem: React.FC<Props> = ({ course }: Props) => {
  return (
    <div className={styles.course}>
      <div className={styles.img}>
        <Image
          src={course.image ? course.image.formats.thumbnail.url : "/images/event-default.png"}
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <p>{course.description}</p>
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
