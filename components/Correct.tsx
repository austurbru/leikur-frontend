import { FaCheckCircle } from "react-icons/fa";

const style = { color: "#10be58", width: "2.5rem", height: "2.5rem", marginRight: "15px" };

export default function Correct() {
  return (
    <span>
      <FaCheckCircle style={style} />
      Correct
    </span>
  );
}