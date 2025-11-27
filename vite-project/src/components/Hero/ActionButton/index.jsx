import { useNavigate } from "react-router-dom";

export default function ActionButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/menu");
  };

  return (
    <button className="btn" onClick={handleClick}>
      Place an Order
    </button>
  );
}
