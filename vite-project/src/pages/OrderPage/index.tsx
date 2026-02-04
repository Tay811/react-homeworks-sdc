import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/ui/Button";
import {
  changeQty,
  removeFromCart,
  clearCart,
  type CartItem,
} from "../../store/slices/userSlice";
import type { RootState } from "../../store";

import "./style.css";

type ErrorsState = {
  street: boolean;
  house: boolean;
  cart: boolean;
};

export default function OrderPage() {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.user.cartItems) as CartItem[];

  const [street, setStreet] = useState<string>("");
  const [house, setHouse] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [errors, setErrors] = useState<ErrorsState>({
    street: false,
    house: false,
    cart: false,
  });

  const total = useMemo(() => {
    return (items ?? []).reduce((sum, it) => {
      const price = Number(it.price || 0);
      const qty = Number(it.qty || 0);
      return sum + price * qty;
    }, 0);
  }, [items]);

  const handleQtyChange = (id: string, value: string) => {
    const qty = Math.max(1, Number(value) || 1);
    dispatch(changeQty({ id, qty }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart({ id }));
  };

  const validate = (): boolean => {
    const next: ErrorsState = {
      street: !street.trim(),
      house: !house.trim(),
      cart: !(items?.length > 0),
    };
    setErrors(next);
    return !next.street && !next.house && !next.cart;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);

      console.log("ORDER:", { items, address: { street, house }, total });

      dispatch(clearCart());
      setStreet("");
      setHouse("");
      setErrors({ street: false, house: false, cart: false });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="orderPageNew">
      <h1 className="orderPageNew__title">Finish your order</h1>

      <form className="orderPageNew__form" onSubmit={handleSubmit} noValidate>
        <div className={`orderPageNew__list ${errors.cart ? "is-invalid" : ""}`}>
          {!items?.length ? (
            <div className="orderPageNew__empty">
              Your cart is empty.
              {errors.cart && (
                <div className="orderPageNew__hint">
                  Add at least one item from Menu.
                </div>
              )}
            </div>
          ) : (
            items.map((it) => (
              <div className="orderItem" key={it.id}>
                <img className="orderItem__img" src={it.img} alt={String(it.meal)} />

                <div className="orderItem__info">
                  <div className="orderItem__name">{String(it.meal)}</div>
                </div>

                <div className="orderItem__right">
                  <div className="orderItem__price">
                    ${Number(it.price).toFixed(2)} USD
                  </div>

                  <input
                    className="orderItem__qty"
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleQtyChange(it.id, e.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="orderItem__remove"
                    onClick={() => handleRemove(it.id)}
                    aria-label="Remove item"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="orderPageNew__address">
          <div className="orderPageNew__row">
            <label className="orderPageNew__label">Street</label>
            <input
              className={`orderPageNew__input ${errors.street ? "is-invalid" : ""}`}
              type="text"
              value={street}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setStreet(e.target.value);
                if (errors.street) setErrors((p) => ({ ...p, street: false }));
              }}
              placeholder=""
            />
          </div>

          <div className="orderPageNew__row">
            <label className="orderPageNew__label">House</label>
            <input
              className={`orderPageNew__input ${errors.house ? "is-invalid" : ""}`}
              type="text"
              value={house}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setHouse(e.target.value);
                if (errors.house) setErrors((p) => ({ ...p, house: false }));
              }}
              placeholder=""
            />
          </div>

          {(errors.street || errors.house) && (
            <div className="orderPageNew__hint">Please fill all address fields.</div>
          )}
        </div>

        <div className="orderPageNew__footer">
          <div className="orderPageNew__total">
            Total: <span>${total.toFixed(2)} USD</span>
          </div>

          <Button type="submit" variant="primary" size="md" disabled={submitting}>
            {submitting ? "Ordering..." : "Order"}
          </Button>
        </div>
      </form>
    </section>
  );
}
