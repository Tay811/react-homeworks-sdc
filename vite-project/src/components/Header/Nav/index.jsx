import "./style.css";

export default function Nav() {
  const links = [
    { label: "Home", href: "#", active: true },
    { label: "Menu", href: "#" },
    { label: "Company", href: "#" },
    { label: "Login", href: "#" },
  ];

  return (
    <nav className="nav">
      <ul className="nav__list">
        {links.map((link) => (
          <li key={link.label} className="nav__item">
            <a
              href={link.href}
              className={`nav__link ${link.active ? "nav__link--active" : ""}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
