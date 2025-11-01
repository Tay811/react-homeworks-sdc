import "./style.css";

export default function TrustPilotView() {
  return (
    <div className="trust">
      <div className="trust__header">
        <span className="trust__star">★</span>
        <span className="trust__brand">Trustpilot</span>
      </div>
      <div className="trust__score">
        <a href="#" className="link">4.8 out of 5</a> based on 2000+ reviews
      </div>
    </div>
  );
}
