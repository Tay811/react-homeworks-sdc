import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.spyOn(console, "log").mockImplementation(() => {});

const originalError = console.error;
vi.spyOn(console, "error").mockImplementation((...args) => {
  const msg = String(args[0] ?? "");
  if (msg.includes("Encountered two children with the same key")) return;
  originalError(...args);
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k }),
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
}));
