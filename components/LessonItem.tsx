import { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Lesson } from "@models/strapi-types";
import styles from "@styles/LessonItem.module.css";
import AuthContext from "@context/AuthContext";

const LessonItem: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const router = useRouter();
  const { setCurrentLesson } = useContext(AuthContext);

  //handleStartLesson will navigate to the lesson and set the lesson
  //as the current lesson for the user
  const handleStartLesson = () => {
    setCurrentLesson(lesson);
    router.push(`/lessons/${lesson?.pages[0]?.pageInfo.slug}`);
  };

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
          <button onClick={handleStartLesson} className="btn">
            Start Lesson
          </button>
        ) : (
          // <Link href={`/lessons/${lesson?.pages[0]?.pageInfo.slug}`}>
          //   <a className="btn">Start lesson</a>
          // </Link>
          "Lesson is currently without content"
        )}
      </div>
    </div>
  );
};

export default LessonItem;
