import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";

import CartButton from "./index";

describe("CartButton", () => {
  it("shows badge count", () => {
    render(
      <MemoryRouter>
        <CartButton count={3} />
      </MemoryRouter>
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("navigates to /order on click", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<CartButton count={1} />} />
          <Route path="/order" element={<div>ORDER_PAGE</div>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByText("ORDER_PAGE")).toBeInTheDocument();
  });
});
