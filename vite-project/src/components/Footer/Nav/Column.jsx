
import Tooltip from "../../ui/Tooltip";

export default function FooterNavColumn({
  title,
  titleHref,        
  titleTarget,      
  items = [],
  dense = false,           
}) {
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
      {title}
    </a>
  ) : (
    <div className="footer__title">{title}</div>
  );

  return (
     <nav className="footer__col" aria-label={title}>
      {Title}

      <ul className={`footer__list${dense ? " footer__list--dense" : ""}`}>
        {items.map((item, i) => {
          const { label, href = "#", target, rel, tooltip } = item;
          const itemRel = target === "_blank" ? rel || "noopener noreferrer" : rel;

          const Link = (
            <a href={href} target={target} rel={itemRel}>
              {label}
            </a>
          );

          return (
            <li key={`${title}-${label}-${i}`}>
              {tooltip ? <Tooltip content={tooltip}>{Link}</Tooltip> : Link}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
