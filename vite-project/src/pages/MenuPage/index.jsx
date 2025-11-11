import { useEffect, useState } from "react";
import { fetchMeals } from "../../api/menu";
import Menu from "../../components/Menu";

export default function MenuPage({ onAdd }) {
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const PAGE_SIZE = 6;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const { data } = await fetchMeals({ page, limit: PAGE_SIZE });
        if (cancelled) return;

        setMeals((prev) => [...prev, ...(data ?? [])]);
        setHasMore((data ?? []).length === PAGE_SIZE);
      } catch {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const handleSeeMore = () => {
    if (!loading && hasMore) setPage((p) => p + 1);
  };

  return (
    <section className="menuPage">
      <Menu
        meals={meals}
        onSeeMore={handleSeeMore}
        hasMore={hasMore}
        loading={loading}
        onAdd={onAdd}
      />
    </section>
  );
}
