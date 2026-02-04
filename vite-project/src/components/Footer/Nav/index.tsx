import "./style.css";
import FooterNavColumn from "./Column";
import { defaultSections } from "./config";
import type { NavSection } from "./config";

export interface NavColsProps {
  sections?: NavSection[];
}

export default function NavCols({ sections = defaultSections }: NavColsProps) {
  return (
    <div className="footer__right">
      {sections.map((col) => (
        <FooterNavColumn key={col.title} {...col} />
      ))}
    </div>
  );
}
