import useTranslation from "next-translate/useTranslation";
import { Lesson } from "@models/strapi-types";
import Layout from "@components/Layout";
import LessonItem from "@components/LessonItem";
import { API_URL } from "@config/index";

const LessonsOfCourse: React.FC<{ lessons: Lesson[] }> = (props) => {
  let { t } = useTranslation();
  return (
    <Layout>
      <h1>{t("common:lessons")}</h1>
      {props.lessons.length === 0 && <h3>No lessons to show</h3>}

      {props.lessons.map((lesson) => (
        <LessonItem key={lesson.id} lesson={lesson} />
      ))}
    </Layout>
  );
};

export default LessonsOfCourse;
 
 export async function getServerSideProps (context: { params?: any; locale?: any; }) {
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
