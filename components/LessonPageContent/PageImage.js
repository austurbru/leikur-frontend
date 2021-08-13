import Image from "next/image";
import styles from "@styles/LessonPageContent/PageImage.module.css";

const PageImage = ({ imageSrcUrl, altText }) => {
  return (
    <div>
      <Image
        src={imageSrcUrl}
        layout='responsive'
        width={500}
        height={281}
        alt={altText}
        className={styles.allCornersRounded}
      />
    </div>
  );
};

export default PageImage;
