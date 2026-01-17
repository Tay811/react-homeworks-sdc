import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

import Button from "../../components/ui/Button";
import "./style.css";
import { useTranslation } from "react-i18next";

import { login } from "../../store/slices/authSlice";

type LoginPayload = {
  id: string;
  name: string;
  pass: string;
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [pass, setPass] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { name, pass };

    try {
      setSubmitting(true);

      const docRef = await addDoc(collection(db, "users"), {
        ...userData,
        createdAt: serverTimestamp(),
      });

      const payload: LoginPayload = { id: docRef.id, ...userData };

      dispatch(login(payload));

      navigate("/order", { replace: true });
    } catch (err) {
      console.error("Failed to save user in Firebase:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/", { replace: true });
  };

  return (
    <section className="loginPage">
      <h1>{t("login.title")}</h1>

      <form onSubmit={handleSubmit} className="loginPage__form">
        <label>
          <span>{t("login.username")}</span>
          <input
            type="text"
            value={name}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </label>

        <label>
          <span>{t("login.password")}</span>
          <input
            type="text"
            value={pass}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPass(e.target.value)
            }
          />
        </label>

        <div className="loginPage__actions">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="loginPage__btn"
            disabled={submitting}
          >
            {submitting ? t("login.saving") : t("login.submit")}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="md"
            className="loginPage__btn"
            onClick={handleCancel}
          >
            {t("login.cancel")}
          </Button>
        </div>
      </form>
    </section>
  );
}
