import "./style.css";
import FooterNavColumn from "./Column";
import { defaultSections } from "./config";

export default function NavCols({ sections = defaultSections }) {
  const safeSections = (sections || []).filter(
    (s) => s && s.title && Array.isArray(s.items) && s.items.length
  );

  return (
    <div className="footer__right">
      {safeSections.map((col, idx) => (
        <FooterNavColumn key={`${col.title}-${idx}`} {...col} />
      ))}
    </div>
  );
}
