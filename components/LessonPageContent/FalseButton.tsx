import useTranslation from "next-translate/useTranslation";
import { Button } from "semantic-ui-react";

interface Props {
  isCorrect: boolean;
  canClick: boolean;
  notifyCorrect: () => void;
  notifyIncorrect: () => void;
}
const FalseButton = ({ isCorrect, canClick, notifyCorrect, notifyIncorrect }: Props) => {
  let { t } = useTranslation();

  const handleClick = () => {
    if (canClick === false) {
      return;
    }
    if (isCorrect) {
      notifyCorrect();
    } else {
      notifyIncorrect();
    }
  };

  return (
    <Button fluid onClick={() => handleClick()}>
      {t("common:false")}
    </Button>
  );
};

export default FalseButton;
