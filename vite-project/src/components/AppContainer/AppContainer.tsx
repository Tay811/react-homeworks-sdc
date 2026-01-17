import type { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import "./style.css";

export interface AppContainerProps {
  children: ReactNode;
  cartCount: number;
  user?: unknown;
  onLogout?: () => void;
}

export default function AppContainer({ children, cartCount }: AppContainerProps) {
  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <main className="app_main">{children}</main>
      <Footer />
    </div>
  );
}
