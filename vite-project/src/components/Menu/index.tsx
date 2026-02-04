import Button from "../ui/Button";
import Card from "./Card";
import Tabs, { type TabItem } from "./Tabs";
import "./style.css";
import { Trans, useTranslation } from "react-i18next";

import type { Meal } from "../../types/meal";

export interface MenuProps {
  meals?: Meal[];
  hasMore: boolean;
  loading: boolean;
  onSeeMore: () => void;

  onAdd?: (item: Meal, qty: number) => void;

  category?: string;
  onCategoryChange?: (next: string) => void;
  categories?: TabItem[];
}

export default function Menu({
  meals = [],
  hasMore,
  loading,
  onSeeMore,
  onAdd,
  category = "Dessert",
  onCategoryChange = () => {},
  categories = [],
}: MenuProps) {
  const { t } = useTranslation();

  return (
    <div className="menu">
      <h2 className="menu__title">{t("menu.title")}</h2>

      <p className="menu__lead">
        <Trans
          i18nKey="menu.lead"
          components={{
            phone: <span className="menu__lead--highlight" />,
          }}
        />
      </p>

      <Tabs items={categories} value={category} onChange={onCategoryChange} />

      <div className="menu__grid">
        {meals.map((item) => (
          <Card key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>

      {hasMore && (
        <div className="menu__more-wrapper">
          <Button
            variant="primary"
            size="md"
            onClick={onSeeMore}
            disabled={loading}
          >
            {loading ? t("menu.loading") : t("menu.seeMore")}
          </Button>
        </div>
      )}
    </div>
  );
}
