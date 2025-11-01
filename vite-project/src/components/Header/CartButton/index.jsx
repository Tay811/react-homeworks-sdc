import "./style.css";
import CartImg from "../../../assets/icons/cart.png";

export default function CartButton() {
  return (
    <button className="cart" aria-label="Cart">
      <img src={CartImg} alt="" className="cart__icon" />
      <span className="cart__badge">0</span>
    </button>
  );
}
