import useTranslation from "next-translate/useTranslation";
import { API_URL } from "@config/index";
import { Lesson } from "@models/strapi-types";
import Layout from "@components/Layout";
import LessonItem from "@components/LessonItem";

interface Props {
  lessons: Lesson[];
}

const LessonsOfCourse = ({ lessons }: Props) => {
  let { t } = useTranslation();
  return (
    <Layout>
      <h1>{t("common:lessons")}</h1>
      {lessons.length !== 0 ? (
        lessons.map((lesson) => <LessonItem key={lesson.id} lesson={lesson} />)
      ) : (
        <h3>{t("common:noLessonsFound")}</h3>
      )}
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

  //make an array of localized lessons
  const tempLessons = [...localizedLessons];

  for (let index = 0; index < defaultLessons.length; index++) {
    const lesson = defaultLessons[index];
    //is there a localized lesson already in tempLesson?
    const itemIndex = localizedLessons.findIndex(
      (item: { levelNo: Number; lessonNo: Number }) =>
        item.levelNo === lesson.levelNo && item.lessonNo === lesson.lessonNo
    );
    // If the lesson has not been translated then the lesson in default locale is pushed to the temp array
    if (itemIndex < 0) {
      tempLessons.push(lesson);
    }
  }

  //Now we have the tempArray as a mix of localized and default lessons.
  //Put the lessons in order
  const existingLessons = tempLessons.sort(function (a, b) {
    var x = a.levelNo - b.levelNo;
    return x == 0 ? a.lessonNo - b.lessonNo : x;
  });

  //we return the existing lessons
  return {
    props: {
      lessons: existingLessons,
    },
  };
}