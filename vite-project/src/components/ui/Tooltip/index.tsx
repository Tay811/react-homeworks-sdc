import { useState, useId, type ReactNode } from "react";
import "./style.css";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [hover, setHover] = useState<boolean>(false);
  const id = useId();

  return (
    <span
      className="tooltip"
      tabIndex={0}
      aria-describedby={id}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {children}
      <span
        id={id}
        role="tooltip"
        className={`tooltip__bubble ${hover ? "is-visible" : ""}`}
      >
        {content}
      </span>
    </span>
  );
}
