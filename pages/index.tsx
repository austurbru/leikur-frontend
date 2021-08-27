import Layout from "@components/Layout";
import styles from "@styles/HomePage.module.css";

const HomePage = () => {
  return (
    <Layout>
      <div className={styles.mainContainer}>
        <div className={styles.coursesContainer}>Courses</div>
        <div className={styles.gamesContainer}>Games</div>
      </div>
    </Layout>
  );
};

export default HomePage;
