import { API_URL } from "@config/index";
import { Level } from "@models/strapi-types";
import Layout from "@components/Layout";
import CourseItem from "@components/CourseItem";

interface Props {
  courses: Level[];
}

const HomePage = ({ courses }: Props) => {
  //const HomePage = () => {
  return (
    <Layout>
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </Layout>
  );
};

export default HomePage;

interface Context {
  locale: string;
}

export async function getServerSideProps({ locale }: Context) {
  const defaultRes = await fetch(`${API_URL}/levels?_sort=levelNo:ASC`);
  const defaultCourses = await defaultRes.json();
  const localizedRes = await fetch(`${API_URL}/levels?_sort=levelNo:ASC&_locale=${locale}`);
  const localizedCourses = await localizedRes.json();
  const tempCourses = [...localizedCourses];

  for (let index = 0; index < defaultCourses.length; index++) {
    const course = defaultCourses[index];
    const itemIndex = localizedCourses.findIndex((item: { levelNo: Number }) => item.levelNo === course.levelNo);
    if (itemIndex < 0) {
      tempCourses.push(course);
    }
  }
  const courses = tempCourses.sort(function (a, b) {
    return a.levelNo - b.levelNo;
  });

  return {
    props: { courses },
  };
}
