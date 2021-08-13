import { Lesson } from "@models/strapi-types";
import Layout from "@components/Layout";
import LessonItem from "@components/LessonItem";
import { API_URL } from "@config/index";

const LessonsOfCourse: React.FC<{ lessons: Lesson[] }> = (props) => {
  return (
    <Layout>
      <h1>Lessons</h1>
      {props.lessons.length === 0 && <h3>No lessons to show</h3>}

      {props.lessons.map((lesson) => (
        <LessonItem key={lesson.id} lesson={lesson} />
      ))}
    </Layout>
  );
};

export default LessonsOfCourse;

/*
interface Context {
  locale: string;
}

export async function getServerSideProps({ locale }: Context) {
  const res = await fetch(`${API_URL}/levels?_sort=levelNo:ASC&_locale=${locale}`);
  const courses = await res.json();
  return {
    props: { courses },
  };
}
*/
  
/*
 export async function getServerSideProps({ context }: any) {
   const { levelNo } = context.params;
   const { locale } = context;


  const initialRes = await fetch(`${API_URL}/lessons?levelNo=${levelNo}&_sort=lessonNo:ASC`);
  const initialLessons = await initialRes.json();

  const translatedRes = await fetch(`${API_URL}/lessons?levelNo=${levelNo}&_sort=lessonNo:ASC&_locale=${locale}`);
  const translatedLessons = await translatedRes.json();

  return {
    props: {
      lessons: translatedLessons ? translatedLessons : initialLessons, 
    },
  };
}
*/

export async function getServerSideProps(context: { params: any }) {
  const { params } = context;

  const res = await fetch(`${API_URL}/lessons?levelNo=${params.levelNo}&_sort=lessonNo:ASC`);
  const lessons = await res.json();

  return {
    props: {
      lessons: lessons,
    },
  };
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/levels`);
//   const levels: Level[] = await res.json();

//   const paths = levels.map((level) => ({
//     params: { levelNo: `${level.levelNo}` },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }
