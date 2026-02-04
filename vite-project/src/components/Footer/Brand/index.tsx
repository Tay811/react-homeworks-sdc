import Logo from "../../../assets/icons/Logo.png";
import "./style.css";

import { Trans, useTranslation } from "react-i18next";

export default function Brand() {
  const { t } = useTranslation();

  return (
    <div className="footer__left">
      <a
        href="/"
        className="footer__logo-link"
        aria-label={t("brand.goHome")}
      >
        <img
          src={Logo}
          alt={t("brand.logoAlt")}
          className="footer__logo"
        />
      </a>

      <p className="footer__tagline">
        <Trans i18nKey="brand.tagline" />
      </p>
    </div>
  );
}
