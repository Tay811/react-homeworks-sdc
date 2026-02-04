import Footer from "../Footer";
import Header from "../Header";
import "./style.css";

export default function AppContainer({ children, cartCount }) {

  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <main className="app_main">{children}</main>
      <Footer />
    </div>
  );
}
