import { Level } from "@models/strapi-types";
import Layout from "@components/Layout";
import { API_URL } from "@config/index";
import styles from "@styles/homepage.module.css";

export default function HomePage() {
  return (
    <Layout>
      <div className={styles.mainContainer}>
        <div className={styles.coursesContainer}>Courses</div>
        <div className={styles.gamesContainer}>Games</div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/levels?_sort=levelNo:ASC`);
  const courses: Level[] = await res.json();

  return {
    props: { courses },
  };
}
