import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./style.css";

export default function AppContainer({ children }) {
  return (
    <div className="app">
      <Header />
      <main className="app__main">{children}</main>
      <Footer />
    </div>
  );
}
