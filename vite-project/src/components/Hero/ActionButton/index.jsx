import { useNavigate } from "react-router-dom";

export default function ActionButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/order");
  };

  return (
    <button className="btn" onClick={handleClick}>
      Place an Order
    </button>
  );
}
