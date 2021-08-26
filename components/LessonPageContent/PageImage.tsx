import Image from "next/image";
import styles from "@styles/LessonPageContent/PageImage.module.css";

const PageImage = (props: { imageSrcUrl: string; altText: string }) => {
  const { imageSrcUrl, altText } = props;
  return (
    <div>
      <Image
        src={imageSrcUrl}
        layout="responsive"
        width={500}
        height={281}
        alt={altText}
        className={styles.allCornersRounded}
      />
    </div>
  );
};

export default PageImage;
