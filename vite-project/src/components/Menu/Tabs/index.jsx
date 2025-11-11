import Button from "../../ui/Button";
import "./style.css";

export default function Tabs({ items = [] }) {
  return (
    <div className="tabs">
      {items.map((tab) => (
        <Button key={tab.id} variant="secondary" size="md">
          {tab.title}
        </Button>
      ))}
    </div>
  );
}

