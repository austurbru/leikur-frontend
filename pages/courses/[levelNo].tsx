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

export async function getServerSideProps(context: { params?: any; locale?: any }) {
  const { levelNo } = context.params;
  const { locale } = context;

  const defaultRes = await fetch(`${API_URL}/lessons?levelNo=${levelNo}&_sort=lessonNo:ASC`);
  const defaultLessons = await defaultRes.json();

  const localizedRes = await fetch(`${API_URL}/lessons?levelNo=${levelNo}&_sort=lessonNo:ASC&_locale=${locale}`);
  const localizedLessons = await localizedRes.json();

  const tempLessons = [...localizedLessons];

  for (let index = 0; index < defaultLessons.length; index++) {
    const lesson = defaultLessons[index];
    const itemIndex = localizedLessons.findIndex(
      (item: { levelNo: Number; lessonNo: Number }) =>
        item.levelNo === lesson.levelNo && item.lessonNo === lesson.lessonNo
    );
    if (itemIndex < 0) {
      tempLessons.push(lesson);
    }
  }

  const existingLessons = tempLessons.sort(function (a, b) {
    var x = a.levelNo - b.levelNo;
    return x == 0 ? a.lessonNo - b.lessonNo : x;
  });

  return {
    props: {
      lessons: existingLessons,
    },
  };
}
