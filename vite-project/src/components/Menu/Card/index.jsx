import { useState } from "react";
import Button from "../../ui/Button";
import "./style.css";
import useFetch from "../../../hooks/useFetch";
import { createOrderItem } from "../../../api/menu";

export default function Card({ item, onAdd }) {
  const { meal, instructions, price, img, id } = item;
  const [qty, setQty] = useState(1);

  const { send, loading } = useFetch();

  const handleAdd = async () => {
    await send({
      action: "createOrderItem",
      request: { mealId: id, qty },
      exec: () => createOrderItem(id, qty),
    });

    onAdd?.(item, qty);
  };

  return (
    <article className="menuCard">
      <div className="menuCard__top">
        <img className="menuCard__img" src={img} alt={meal} />
        <div className="menuCard__info">
          <div className="menuCard__head">
            <h3 className="menuCard__title">{meal}</h3>
            <span className="menuCard__price">${price} USD</span>
          </div>

          <p className="menuCard__desc">{instructions?.slice(0, 90)}...</p>

          <div className="menuCard__bottom">
            <input
              className="menuCard__qty"
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 1)}
            />

            <Button 
              variant="primary" 
              size="md" 
              onClick={handleAdd}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add to cart"}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
