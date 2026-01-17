import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import "./style.css";

type Lang = "en" | "de" | "es";

export default function LanguageDropdown() {
  const { i18n, t } = useTranslation();

  const currentLang = (i18n.resolvedLanguage?.slice(0, 2) ||
    "en") as Lang;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as Lang;
    localStorage.setItem("lang", next);
    void i18n.changeLanguage(next);
  };

  return (
    <div className="languageDropdown">
      <select
        className="languageDropdown__select"
        value={currentLang}
        onChange={handleChange}
      >
        <option value="en">EN</option>
        <option value="de">DE</option>
        <option value="es">ES</option>
      </select>
    </div>
  );
}
