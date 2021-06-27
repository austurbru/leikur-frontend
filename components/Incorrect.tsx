import { AiFillCloseCircle } from "react-icons/ai";

const style = { color: "#e65035", width: "2.5rem", height: "2.5rem" };

export default function Incorrect() {
  return (
    <span>
      <AiFillCloseCircle style={style} />
      Incorrect
    </span>
  );
}