import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Menu from "../../components/Menu";
import { fetchMeals } from "../../api/menu";
import useFetch from "../../hooks/useFetch";

import { addToCart } from "../../store/slices/userSlice";

import type { Meal } from "../../types/meal";
import type { TabItem } from "../../components/Menu/Tabs";

const DEFAULT_CATEGORIES: TabItem[] = [
  { id: 1, value: "dessert", title: "menu.tabs.dessert" },
  { id: 2, value: "dinner", title: "menu.tabs.dinner" },
  { id: 3, value: "breakfast", title: "menu.tabs.breakfast" },
];

export default function MenuPage() {
  const dispatch = useDispatch();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("dessert");

  const [categories, setCategories] = useState<TabItem[]>(DEFAULT_CATEGORIES);

  const PAGE_SIZE = 6;
  const { send } = useFetch(); 

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await send<{ data: Meal[]; total: number }>({
          action: "fetchMeals",
          request: { page: 1, limit: 1000 },
          exec: () => fetchMeals({ page: 1, limit: 1000 }),
        });

        if (cancelled) return;

        const unique = [
          ...new Set((res.data ?? []).map((m) => m.category).filter(Boolean)),
        ] as string[];

        const list: TabItem[] =
  unique.length > 0
    ? unique.map((key, i) => ({
        id: i + 1,
        value: key,
        title: `menu.tabs.${key}`,
      }))
    : DEFAULT_CATEGORIES;

        setCategories(list);
      } catch {
        
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [send]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const res = await send<{ data: Meal[]; total: number }>({
          action: "fetchMeals",
          request: { page, limit: PAGE_SIZE, category },
          exec: () => fetchMeals({ page, limit: PAGE_SIZE, category }),
        });

        if (cancelled) return;

        setMeals((prev) => [...prev, ...(res.data ?? [])]);
        setHasMore((res.data ?? []).length === PAGE_SIZE);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, category, send]);

  const handleSeeMore = () => {
    if (!loading && hasMore) setPage((p) => p + 1);
  };

  const handleCategoryChange = (next: string) => {
    setCategory(next);
    setMeals([]);
    setPage(1);
    setHasMore(true);
  };

  const handleAdd = (item: Meal, qty = 1) => {
    dispatch(addToCart({ item, qty }));
  };

  return (
    <section className="menuPage">
      <Menu
        meals={meals}
        onSeeMore={handleSeeMore}
        hasMore={hasMore}
        loading={loading}
        onAdd={handleAdd}
        category={category}
        onCategoryChange={handleCategoryChange}
        categories={categories}
      />
    </section>
  );
}
