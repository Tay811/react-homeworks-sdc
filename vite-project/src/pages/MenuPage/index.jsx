import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { fetchMeals } from "../../api/menu";
import useFetch from "../../hooks/useFetch";

const DEFAULT_CATEGORIES = [
  { id: 1, title: "Dessert" },
  { id: 2, title: "Dinner" },
  { id: 3, title: "Breakfast" },
];

export default function MenuPage({ onAdd }) {
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Dessert");
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  const PAGE_SIZE = 6;
  const { send } = useFetch();

  useEffect(() => {
    let cancelled = false;

    send({
      action: "fetchMeals",
      request: { page: 1, limit: 1000 },
      exec: () => fetchMeals({ page: 1, limit: 1000 }),
    }).then(({ data }) => {
      if (cancelled) return;

      const unique = [
        ...new Set((data ?? []).map((m) => m.category).filter(Boolean)),
      ];

      const list =
        unique.length > 0
          ? unique.map((key, i) => ({ id: i + 1, title: key }))
          : DEFAULT_CATEGORIES;

      setCategories(list);
    });

    return () => {
      cancelled = true;
    };
  }, [send]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const { data } = await send({
          action: "fetchMeals",
          request: { page, limit: PAGE_SIZE, category },
          exec: () => fetchMeals({ page, limit: PAGE_SIZE, category }),
        });

        if (cancelled) return;

        setMeals((prev) => [...prev, ...(data ?? [])]);
        setHasMore((data ?? []).length === PAGE_SIZE);
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


  const handleCategoryChange = (next) => {
    setCategory(next);
    setMeals([]); 
    setPage(1);
    setHasMore(true);
  };

  return (
    <section className="menuPage">
      <Menu
        meals={meals}
        onSeeMore={handleSeeMore}
        hasMore={hasMore}
        loading={loading}
        onAdd={onAdd}
        category={category}
        onCategoryChange={handleCategoryChange}
        categories={categories}
      />
    </section>
  );
}