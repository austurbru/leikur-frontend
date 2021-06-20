import { Lesson, Level } from "@models/strapi-types";
import Layout from "@components/Layout";
import LessonItem from "@components/LessonItem";
import { API_URL } from "@config/index";

const LessonsOfCourse: React.FC<{ lessons: Lesson[] }> = (props) => {
  return (
    <Layout>
      <h1>Lessons</h1>
      {props.lessons.length === 0 && <h3>No lessons to show</h3>}

      {props.lessons.map((lesson) => (
        <LessonItem key={lesson._id} lesson={lesson} />
      ))}
    </Layout>
  );
};

export default LessonsOfCourse;

export async function getStaticProps(context: { params: any }) {
  const { params } = context;

  const res = await fetch(`${API_URL}/lessons?levelNo=${params.levelNo}&_sort=lessonNo:ASC`);
  const lessons = await res.json();
  console.log(lessons)
  return {
    props: {
      lessons: lessons,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/levels`);
  const levels: Level[] = await res.json();

  const paths = levels.map((level) => ({
    params: { levelNo: `${level.levelNo}` },
  }));

  console.log(paths)

  return {
    paths,
    fallback: false,
  };
}
