import Tooltip from "../../ui/Tooltip";
import type { NavItem } from "./config";
import { useTranslation } from "react-i18next";

export interface FooterNavColumnProps {
  title: string;
  titleHref?: string;
  titleTarget?: string;
  items?: NavItem[];
  dense?: boolean;
}

export default function FooterNavColumn({
  title,
  titleHref,
  titleTarget,
  items = [],
  dense = false,
}: FooterNavColumnProps) {
  const { t } = useTranslation();

  if (!items.length) return null;

  const safeRel =
    titleTarget === "_blank" ? "noopener noreferrer" : undefined;

  const Title = titleHref ? (
    <a
      href={titleHref}
      target={titleTarget}
      rel={safeRel}
      className="footer__title footer__title--link"
    >
      {t(title)}
    </a>
  ) : (
    <div className="footer__title">{t(title)}</div>
  );

  return (
    <nav className="footer__col" aria-label={t(title)}>
      {Title}

      <ul className={`footer__list${dense ? " footer__list--dense" : ""}`}>
        {items.map((item, i) => {
          const { label, href = "#", target, rel, tooltip } = item;
          const itemRel =
            target === "_blank" ? rel || "noopener noreferrer" : rel;

          const Link = (
            <a href={href} target={target} rel={itemRel}>
              {t(label)}
            </a>
          );

          return (
            <li key={`${title}-${label}-${i}`}>
              {tooltip ? (
                <Tooltip content={t(tooltip)}>{Link}</Tooltip>
              ) : (
                Link
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
