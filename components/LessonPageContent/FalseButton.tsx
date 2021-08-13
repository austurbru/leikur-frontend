import { Button } from 'semantic-ui-react'

interface Props {
  isCorrect: boolean;
  canClick: boolean;
  notifyCorrect: () => void;
  notifyIncorrect: () => void;
}

function FalseButton({ isCorrect, canClick, notifyCorrect, notifyIncorrect }: Props) {
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

  return <Button fluid onClick={() => handleClick()}>False</Button>;
}

export default FalseButton;
