import Button from "../../ui/Button";
import "./style.css";
import { useTranslation } from "react-i18next";

export type TabItem = {
  id: number | string;
  value: string;
  title: string;
};

function normalize(value: unknown): string {
  return (value ?? "").toString().trim().toLowerCase();
}

export interface TabsProps {
  items?: TabItem[];
  value?: string;
  onChange?: (nextValue: string) => void;
}

export default function Tabs({ items = [], value, onChange }: TabsProps) {
  const { t } = useTranslation();
  const current = normalize(value);

  return (
    <div className="tabs">
      {items.map((tab) => {
        const isActive = current === normalize(tab.value);

        return (
          <Button
            key={tab.value}
            variant={isActive ? "primary" : "secondary"}
            size="md"
            onClick={() => onChange?.(tab.value)}
          >
            {t(tab.title)}
          </Button>
        );
      })}
    </div>
  );
}
