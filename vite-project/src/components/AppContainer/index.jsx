import Footer from "../Footer";
import Header from "../Header";

export default function AppContainer({ children, cartCount }) {
  return (
    <>
      <Header cartCount={cartCount} />
      <main>{children}</main>
      <Footer/>
    </>
  );
}
