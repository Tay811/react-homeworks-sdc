import Button from "../../ui/Button";
import "./style.css";

export default function Tabs({ items = [], value, onChange }) {
  return (
    <div className="tabs">
      {items.map((tab) => {
        const isActive = value === tab.title;
        return (
          <Button
            key={tab.id ?? tab.title}
            variant={isActive ? "primary" : "secondary"}
            size="md"
            onClick={() => onChange?.(tab.title)}
          >
            {tab.title}
          </Button>
        );
      })}
    </div>
  );
}

