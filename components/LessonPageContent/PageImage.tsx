import Image from "next/image";
import styles from "@styles/LessonPageContent/PageImage.module.css";

interface Props {
  imageSrcUrl: string;
  blurredImage: string;
  altText: string;
}

const PageImage = ({ imageSrcUrl, blurredImage, altText }: Props) => {
  return (
    <div>
      <Image
        src={imageSrcUrl}
        layout="responsive"
        width={500}
        height={281}
        alt={altText}
        placeholder="blur" 
        blurDataURL={blurredImage}
        className={styles.allCornersRounded}
      />
    </div>
  );
};

export default PageImage;
