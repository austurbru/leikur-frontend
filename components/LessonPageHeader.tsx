import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import Backdrop from "@components/Backdrop";
import SideDrawer from "@components/SideDrawer";
import HelpLinks from "@components/HelpLinks";
import AuthContext from "@context/AuthContext";
import ProgressBar from "@components/LessonPageContent/ProgressBar";
import styles from "@styles/LessonPageHeader.module.css";

interface Props {
  progress: number;
  slug: string;
}

const LessonPageHeader = ({ progress, slug }: Props) => {
  const [drawerIsOpen, setdrawerIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const { setCurrentLessonState } = useContext(AuthContext);

  const router = useRouter();

  const openDrawer = (): void => {
    setdrawerIsOpen(true);
  };

  const closeDrawer = (): void => {
    setdrawerIsOpen(false);
  };

  //when close the lesson without completing it then save the page slug
  const closePage = (): void => {
    setIsClosing(true);
    const courseKey = slug.split("-")[0];
    setCurrentLessonState(`lessons/${slug}`, progress);
    router.push(`/courses/${courseKey}`);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop selector="#backdrop" notifyClick={closeDrawer}></Backdrop>}
      <SideDrawer show={drawerIsOpen} selector="#side-drawer">
        <HelpLinks />
      </SideDrawer>
      <div className={styles.headerCenter}>
        <div className={styles.topContainer}>
          <div className={styles.buttonContainer}>
            <Button circular color="blue" size="large" icon="info" onClick={openDrawer} />
          </div>
          <div className={styles.progressBarContainer}>
            <ProgressBar height={10} completed={progress}></ProgressBar>
          </div>
          <div className={styles.buttonContainer}>
            <Button circular color="red" size="large" icon="close" loading={isClosing} onClick={() => closePage()} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonPageHeader;
