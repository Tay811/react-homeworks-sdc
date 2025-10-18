import Logo from "../../../assets/icons/Logo.png";
import "./style.css";


export default function Brand() {
  return (
    <div className="footer__left">
      <img src={Logo} alt="Flowbase" className="footer__logo" />
      <p className="footer__tagline">
        Takeaway & Delivery template
        <br />
        for small – medium businesses.
      </p>
    </div>
  );
}
