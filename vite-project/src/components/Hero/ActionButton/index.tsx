import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ActionButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate("/order");
  };

  return (
    <button className="btn-action" onClick={handleClick}>
      {t("actions.order")}
    </button>
  );
}
