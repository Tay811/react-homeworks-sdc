const MEALS_API = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals';   
const ORDERS_API = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders'; 

export async function fetchMeals({ page = 1, limit = 6, category } = {}) {
  const url = new URL(MEALS_API);
  url.searchParams.set("page", page);
  url.searchParams.set("limit", limit);
  if (category) url.searchParams.set("category", category);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load meals");
  const json = await res.json();
  if (Array.isArray(json)) {
    return { data: json, total: json.length };
  }
  return { data: json.data ?? [], total: json.total ?? (json.data?.length ?? 0) };
}

export async function createOrderItem(mealId, qty) {
  const res = await fetch(ORDERS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mealId, qty }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create order item: ${res.statusText}`);
  }

  return res.json();
}
