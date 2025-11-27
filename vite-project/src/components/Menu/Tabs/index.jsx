import Button from "../../ui/Button";
import "./style.css";

function normalize(str) {
  return (str ?? "").toString().trim().toLowerCase();
}

export default function Tabs({ items = [], value, onChange }) {
  const current = normalize(value);

  return (
    <div className="tabs">
      {items.map((tab) => {
        const isActive = current === normalize(tab.title);

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
