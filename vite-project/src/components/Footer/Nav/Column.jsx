import TooltipPhone from "./TooltipPhone";

export default function FooterNavColumn({ title, items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="footer__col" aria-label={title}>
      <div className="footer__title">{title}</div>
      <ul className="footer__list">
        {items.map(({ label, href = "#", target, rel }, i) => (
          <li key={`${title}-${i}-${label}`}>
            {label === "Phone" ? (
              <TooltipPhone />
            ) : (
              <a href={href} target={target} rel={rel}>
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
