import { Button } from 'semantic-ui-react'

interface Props {
  isCorrect: boolean;
  canClick: boolean;
  notifyCorrect: () => void;
  notifyIncorrect: () => void;
}

function TrueButton({ isCorrect, canClick, notifyCorrect, notifyIncorrect }: Props) {
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

  return <Button fluid onClick={() => handleClick()}>True</Button>;
}

export default TrueButton;
