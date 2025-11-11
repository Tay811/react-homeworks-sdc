import "./style.css";

export default function Button({
  children,
  variant = "primary", 
  size = "md", 
  fullWidth = false,
  onClick,
  type = "button",
  disabled = false,
}) {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
  ].join(" ");

  return (
    <button className={classes} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
