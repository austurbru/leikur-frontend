import CourseItem from "@components/CourseItem";
import Layout from "@components/Layout";
import { Level } from "@models/strapi-types";
import { API_URL } from "@config/index";

const CoursesPage: React.FC<{ courses: Level[] }> = ({ courses }) => {
  return (
    <Layout>
      <h1>Courses</h1>
      {courses.length === 0 && <h3>No courses to show</h3>}

      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </Layout>
  );
};

export default CoursesPage;

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/levels?_sort=levelNo:ASC`);
  const courses = await res.json();
  return {
    props: { courses },
  };
}

/*
const CoursesPage: React.FC<{ courses: Level[] }> = ({ courses }) => {

  export default CoursesPage;
*/
