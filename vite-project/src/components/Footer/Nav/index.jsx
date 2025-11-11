import "./style.css";
import FooterNavColumn from "./Column";
import { defaultSections } from "./config";

export default function NavCols({ sections = defaultSections }) {
  return (
    <div className="footer__right">
      {sections.map((col) => (
        <FooterNavColumn
          key={col.title}
          {...col}
        />
      ))}
    </div>
  );
}

