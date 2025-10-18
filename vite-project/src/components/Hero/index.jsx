import "./style.css";
import BgImg from "../../assets/images/bg-main.png";

import Text from "./Text";
import ActionButton from "./ActionButton";
import TrustPilotView from "./TrustPilotView";
import ImagePanel from "./ImagePanel";

export default function Hero() {
  return (
    <section className="hero">
      <img src={BgImg} alt="" className="hero__bgImg" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__left">
          <Text />

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
