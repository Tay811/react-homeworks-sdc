import Button from "../ui/Button";
import Card from "./Card";
import Tabs from "./Tabs";
import "./style.css";

export default function Menu({ meals = [], hasMore, loading, onSeeMore, onAdd }) {
  const tabItems = [
    { id: 1, title: "Desert" },
    { id: 2, title: "Dinner" },
    { id: 3, title: "Breakfast" },
  ];

  return (
    <div className="menu">
      <h2 className="menu__title">Browse our menu</h2>
      <p className="menu__lead">
        Use our menu to place an order online, or <span className="menu__lead--highlight">phone</span> our store to place a pickup order.
        Fast and fresh food.
      </p>

      <Tabs items={tabItems} />

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
