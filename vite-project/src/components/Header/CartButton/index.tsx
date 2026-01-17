import "./style.css";
import CartImg from "../../../assets/icons/cart.png";
import { useNavigate } from "react-router-dom";

export interface CartButtonProps {
  count?: number;
}

export default function CartButton({ count = 0 }: CartButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/order");
  };

  return (
    <button className="cartButton" type="button" onClick={handleClick}>
      <img src={CartImg} alt="Cart" className="cartButton__icon" />
      <span className="cartButton__badge">{count}</span>
    </button>
  );
}
