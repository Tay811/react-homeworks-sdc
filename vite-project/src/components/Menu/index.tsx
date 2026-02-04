import Button from "../ui/Button";
import Card from "./Card";
import Tabs, { type TabItem } from "./Tabs";
import "./style.css";

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
  return (
    <div className="menu">
      <h2 className="menu__title">Browse our menu</h2>
      <p className="menu__lead">
        Use our menu to place an order online, or{" "}
        <span className="menu__lead--highlight">phone</span> our store to place a
        pickup order. Fast and fresh food.
      </p>

      <Tabs items={categories} value={category} onChange={onCategoryChange} />

      <div className="menu__grid">
        {meals.map((item) => (
          <Card key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>

      {hasMore && (
        <div className="menu__more-wrapper">
          <Button variant="primary" size="md" onClick={onSeeMore} disabled={loading}>
            {loading ? "Loading..." : "See more"}
          </Button>
        </div>
      )}
    </div>
  );
}
