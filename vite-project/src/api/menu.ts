import type { Meal } from "../types/meal";

const MEALS_API = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";
const ORDERS_API = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders";

export type FetchMealsParams = {
  page?: number;
  limit?: number;
  category?: string;
};

export type FetchMealsResult = {
  data: Meal[];
  total: number;
};

export async function fetchMeals(
  { page = 1, limit = 6, category }: FetchMealsParams = {}
): Promise<FetchMealsResult> {
  const url = new URL(MEALS_API);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  if (category) url.searchParams.set("category", category);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load meals");

  const json: unknown = await res.json();

  if (Array.isArray(json)) {
    return { data: json as Meal[], total: json.length };
  }

  const obj = json as { data?: Meal[]; total?: number };
  return { data: obj.data ?? [], total: obj.total ?? (obj.data?.length ?? 0) };
}

export type OrderResponse = {
  id: string;
  mealId: string;
  qty: number;
};

export async function createOrderItem(
  mealId: string,
  qty: number
): Promise<OrderResponse> {
  const res = await fetch(ORDERS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mealId, qty }),
  });

  if (!res.ok) throw new Error(`Failed to create order item: ${res.statusText}`);
  return (await res.json()) as OrderResponse;
}
