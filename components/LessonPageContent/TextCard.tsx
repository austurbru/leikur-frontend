import React from "react";
import { Card } from "semantic-ui-react";

interface Props {
    content: string;
  }
const TextCard = ({ content}: Props) => {
  return (
    <div>
      <Card color="blue" fluid>
        <Card.Content description={content} />
      </Card>
    </div>
  );
};

export default TextCard;
