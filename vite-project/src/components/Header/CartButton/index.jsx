import "./style.css";
import CartImg from "../../../assets/icons/cart.png";


export default function CartButton({ count = 0 }) {
  return (
    <button className="cartButton" type="button">
      <img src={CartImg} alt="Cart" className="cartButton__icon" />
      <span className="cartButton__badge">{count}</span>
    </button>
  );
}


