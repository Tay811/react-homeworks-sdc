import "./style.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

type NavItem = {
  label: string;
  to: string;
};

export default function Nav() {
  const { t } = useTranslation();

  const links: NavItem[] = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.menu"), to: "/menu" },
    { label: t("nav.company"), to: "/company" },
    { label: t("nav.login"), to: "/login" },
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
