import "./style.css";

import { useTheme } from "../../context/theme/ThemeContext";

import BgLight from "../../assets/images/bg-main.png";
import BgDark from "../../assets/images/bg-main_dark.png";

import HeroContent from "./HeroContent";
import ActionButton from "./ActionButton";
import TrustPilotView from "./TrustPilotView";
import ImagePanel from "./ImagePanel";

export default function Hero() {
  const { resolvedTheme } = useTheme();

  const bgImg = resolvedTheme === "dark" ? BgDark : BgLight;

  return (
    <section className="hero">
      <img
        src={bgImg}
        alt=""
        className="hero__bgImg"
        aria-hidden="true"
      />

      <div className="hero__inner">
        <div className="hero__left">
          <HeroContent />

          <div className="hero__cta">
            <ActionButton />
            <TrustPilotView />
          </div>
        </div>

        <ImagePanel />
      </div>
    </section>
  );
}
