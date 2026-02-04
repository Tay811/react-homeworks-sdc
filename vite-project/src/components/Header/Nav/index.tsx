import "./style.css";
import { NavLink } from "react-router-dom";

type NavItem = {
  label: string;
  to: string;
};

export default function Nav() {
  const links: NavItem[] = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "Company", to: "/company" },
    { label: "Login", to: "/login" },
  ];

  return (
    <nav className="nav">
      <ul className="nav__list">
        {links.map((link) => (
          <li key={link.label} className="nav__item">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `nav__link ${isActive ? "nav__link--active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
