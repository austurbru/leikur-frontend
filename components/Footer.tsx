import Link from "next/link";
import styles from "@styles/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Austurbrú 2021</p>
      <p>
        <Link href="/about">About This Project</Link>
      </p>
    </footer>
  );
};

export default Footer;
