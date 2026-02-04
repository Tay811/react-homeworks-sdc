import "./style.css";

import Ig from "../../../assets/icons/instagram.png";
import Yt from "../../../assets/icons/youtube.png";
import Tw from "../../../assets/icons/twitter.png";

import { Trans, useTranslation } from "react-i18next";

export default function Bottom() {
  const { t } = useTranslation();

  return (
    <div className="footer__bottom">
      <div className="footer__credits">
        <Trans
          i18nKey="footer.credits"
          components={{
            flowbase: <a href="#" className="footer__link" />,
            webflow: <a href="#" className="footer__link" />,
          }}
        />
      </div>

      <div className="footer__social">
        <a href="#" aria-label={t("footer.social.instagram")}>
          <img src={Ig} alt="" />
        </a>
        <a href="#" aria-label={t("footer.social.twitter")}>
          <img src={Tw} alt="" />
        </a>
        <a href="#" aria-label={t("footer.social.youtube")}>
          <img src={Yt} alt="" />
        </a>
      </div>
    </div>
  );
}
