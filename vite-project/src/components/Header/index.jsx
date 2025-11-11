import "./style.css";
import LogoImg from "../../assets/icons/Logo.png";
import Nav from "./Nav";
import CartButton from "./CartButton";

export default function Header({ cartCount = 0 }) {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="#" className="header__brand" aria-label="Flowbase">
          <img src={LogoImg} alt="Flowbase" className="brand__icon" />
        </a>

        <div className="header__right">
          <Nav />
          <CartButton count={cartCount} />
        </div>
      </div>
    </header>
  );
}
