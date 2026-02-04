import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import Button from "../../components/ui/Button";
import "./style.css";

export default function LoginPage({ onLogin }) {
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, pass };

    try {
      setSubmitting(true);

      const docRef = await addDoc(collection(db, "users"), {
        ...userData,
        createdAt: serverTimestamp(),
      });

      console.log("User saved with id:", docRef.id);

      onLogin({ id: docRef.id, ...userData });
      navigate("/order", { replace: true });
    } catch (err) {
      console.error("Failed to save user in Firebase:", err);
      alert("Не удалось сохранить пользователя");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/", { replace: true });
  };

  return (
    <section className="loginPage">
      <h1>Log in</h1>

      <form onSubmit={handleSubmit} className="loginPage__form">
        <label>
          <span>User name</span>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="text"
            value={pass}
            required
            onChange={(e) => setPass(e.target.value)}
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
            {submitting ? "Saving..." : "Submit"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="md"
            className="loginPage__btn"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}
