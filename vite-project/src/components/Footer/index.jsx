import "./style.css";
import BgFooter from "../../assets/images/bg-footer.png";
import Brand from "./Brand";
import NavCols from "./Nav";
import Bottom from "./Bottom";


export default function Footer() {
  return (
    <footer className="footer">
      <img src={BgFooter} alt="" className="footer__bg" aria-hidden="true" />

      <div className="footer__container">
        <div className="footer__main">
          <Brand />   
          <NavCols /> 
        </div>
        <div className="footer__divider" aria-hidden="true" />
        <Bottom />
      </div>
    </footer>
  );
}
