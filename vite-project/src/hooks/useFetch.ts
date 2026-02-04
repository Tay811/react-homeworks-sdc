import { useState, useCallback } from "react";

type ApiLog = {
  action: string;
  request: Record<string, unknown>;
  response: unknown;
  status: number | "error";
  time: string;
  timestamp: string;
};

type SendArgs<TResponse> = {
  action: string;
  request?: Record<string, unknown>;
  exec: () => Promise<TResponse>;
};

export default function useFetch() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const saveLog = (log: ApiLog) => {
    const prev: ApiLog[] = JSON.parse(localStorage.getItem("apiLogs") || "[]");
    const next = [log, ...prev];
    localStorage.setItem("apiLogs", JSON.stringify(next));
  };

  const send = useCallback(async function send<TResponse>({
    action,
    exec,
    request,
  }: SendArgs<TResponse>): Promise<TResponse> {
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
    } catch (err: unknown) {
      const finishedAt = performance.now();

      const message =
        err instanceof Error ? err.message : "Unknown error";

      saveLog({
        action,
        request: request ?? {},
        response: { message },
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
