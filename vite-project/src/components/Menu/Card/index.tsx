import { useState, type ChangeEvent } from "react";
import Button from "../../ui/Button";
import "./style.css";
import { useTranslation } from "react-i18next";

import type { Meal } from "../../../types/meal";

export interface CardProps {
  item: Meal;
  onAdd?: (item: Meal, qty: number) => void;
}

export default function Card({ item, onAdd }: CardProps) {
  const { meal, instructions, price, img } = item;
  const [qty, setQty] = useState<number>(1);
  const { t } = useTranslation();

  const handleAdd = () => {
    onAdd?.(item, qty);
  };

  const handleQtyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQty(Number(e.target.value) || 1);
  };

  return (
    <article className="menuCard">
      <div className="menuCard__top">
        <img
          className="menuCard__img"
          src={img}
          alt={t("menu.card.imageAlt")}
        />
        <div className="menuCard__info">
          <div className="menuCard__head">
            <h3 className="menuCard__title">{meal}</h3>
            <span className="menuCard__price">
              ${price} {t("menu.card.currency")}
            </span>
          </div>

          <p className="menuCard__desc">{instructions?.slice(0, 90)}.</p>

          <div className="menuCard__bottom">
            <input
              className="menuCard__qty"
              type="number"
              min={1}
              value={qty}
              onChange={handleQtyChange}
            />

            <Button variant="primary" size="md" onClick={handleAdd}>
              {t("menu.card.addToCart")}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
