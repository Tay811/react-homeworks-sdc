import "./style.css";
import MainImg from "../../../assets/images/main.png";

export default function ImagePanel() {
  return (
    <div className="hero__right">
      <div className="hero__imageWrap">
        <img src={MainImg} alt="Food" className="hero__image" />
      </div>
    </div>
  );
}
