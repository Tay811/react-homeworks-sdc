import { useState, useCallback } from "react";

export default function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveLog = (log) => {
    const prev = JSON.parse(localStorage.getItem("apiLogs") || "[]");
    const next = [log, ...prev];
    localStorage.setItem("apiLogs", JSON.stringify(next));
  };

  const send = useCallback(async ({ action, exec, request }) => {
    setLoading(true);
    setError(null);
    setData(null);

    const startedAt = performance.now();
    const timestamp = new Date().toISOString();

    try {
      const response = await exec();

      const finishedAt = performance.now();
      saveLog({
        action,
        request: request ?? {},
        response,
        status: 200,
        time: `${Math.round(finishedAt - startedAt)}ms`,
        timestamp,
      });

      setData(response);
      return response;
    } catch (err) {
      const finishedAt = performance.now();

      saveLog({
        action,
        request: request ?? {},
        response: { message: err.message },
        status: "error",
        time: `${Math.round(finishedAt - startedAt)}ms`,
        timestamp,
      });

      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, send };
}
