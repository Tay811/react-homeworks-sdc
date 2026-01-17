import Button from "../../ui/Button";
import "./style.css";

export type TabItem = {
  id: number | string;
  title: string;
};

function normalize(value: unknown): string {
  return (value ?? "").toString().trim().toLowerCase();
}

export interface TabsProps {
  items?: TabItem[];
  value?: string;
  onChange?: (nextTitle: string) => void;
}

export default function Tabs({ items = [], value, onChange }: TabsProps) {
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
