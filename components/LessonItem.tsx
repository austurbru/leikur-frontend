import Image from "next/image";
import Link from "next/link";
import { Lesson } from "@models/strapi-types";
import styles from "@styles/LessonItem.module.css";

const LessonItem: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  return (
    <div className={styles.lesson}>
      <div className={styles.img}>
        <Image
          src={lesson.image ? lesson.image.formats.thumbnail.url : "/images/event-default.png"}
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <p>{lesson.description}</p>
      </div>
      <div className={styles.link}>
        {lesson.pages && lesson.pages.length > 0 ? (
          <Link href={`/lessons/${lesson?.pages[0]?.pageInfo.slug}`}>
            <a className="btn">Start lesson</a>
          </Link>
        ) : (
          "Lesson is currently without content"
        )}
      </div>
    </div>
  );
};

export default LessonItem;
