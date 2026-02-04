import "./style.css";
import { Trans, useTranslation } from "react-i18next";

export default function HeroContent() {
  useTranslation();

  return (
    <div className="heroText">
      <h1 className="hero__title">
        <Trans
          i18nKey="hero.title"
          components={{ accent: <span className="accent" /> }}
        />
      </h1>

      <p className="hero__text">
        <Trans i18nKey="hero.description" />
      </p>
    </div>
  );
}
