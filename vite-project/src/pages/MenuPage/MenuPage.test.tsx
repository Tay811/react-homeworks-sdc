import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import MenuPage from "./index";
import { renderWithStore } from "../../test/testUtils";

const mockedMeals = [
  {
    id: "1",
    meal: "Pizza",
    instructions: "Hot and tasty",
    price: 10,
    img: "x.png",
    category: "dessert",
  },
];

vi.mock("../../api/menu", () => ({
  fetchMeals: vi.fn(async () => ({ data: mockedMeals, total: 1 })),
}));

vi.mock("../../hooks/useFetch", () => ({
  default: () => ({
    send: vi.fn(async ({ exec }: any) => exec()),
  }),
}));

describe("MenuPage -> add to cart flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("adds item to cart when clicking 'Add to cart'", async () => {
    const user = userEvent.setup();

    const { store } = renderWithStore(<MenuPage />, {
      preloadedState: {
        user: { cartItems: [], cartCount: 0 } as any,
        auth: { user: { id: "u1" }, isLoggedIn: true } as any,
      },
    });

    expect(await screen.findByText("Pizza")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "menu.card.addToCart" })
    );

    const state = store.getState() as any;
    expect(state.user.cartItems).toHaveLength(1);
    expect(state.user.cartItems[0].id).toBe("1");
    expect(state.user.cartItems[0].qty).toBe(1);
    expect(state.user.cartCount).toBe(1);
  });
});
