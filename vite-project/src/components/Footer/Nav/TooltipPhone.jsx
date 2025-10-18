import { useState } from "react";
import "../../Footer/style.css"; 

export default function TooltipPhone() {
  const [hover, setHover] = useState(false);
  const phoneNumber = "+1 (234) 567-89-00";

  return (
    <span
      className="tooltip"
      tabIndex={0}
      aria-describedby="tooltip-phone"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      Phone
      <span
        id="tooltip-phone"
        role="tooltip"
        className={`tooltip__bubble ${hover ? "is-visible" : ""}`}
      >
        Phone: {phoneNumber}
      </span>
    </span>
  );
}
