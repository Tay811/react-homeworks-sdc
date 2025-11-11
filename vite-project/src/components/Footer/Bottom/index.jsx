import "./style.css";

import Ig from "../../../assets/icons/instagram.png";
import Yt from "../../../assets/icons/youtube.png";
import Tw from "../../../assets/icons/twitter.png";

export default function Bottom() {
  return (
    <div className="footer__bottom">
      <div className="footer__credits">
        Built by <a href="#" className="footer__link">Flowbase</a>. Powered by <a href="#" className="footer__link">Webflow</a>
      </div>

      <div className="footer__social">
        <a href="#" aria-label="Instagram"><img src={Ig} alt="" /></a>
        <a href="#" aria-label="Twitter"><img src={Tw} alt="" /></a>
        <a href="#" aria-label="YouTube"><img src={Yt} alt="" /></a>
      </div>
    </div>
  );
}
