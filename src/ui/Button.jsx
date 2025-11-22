import { Link } from "react-router-dom";

function Button({
  children,
  disabled = undefined,
  to = undefined,
  type,
  onClick = undefined,
}) {
  const base =
    "bg-yellow-400 text-sm hover:bg-yellow-300 rounded-full outline-none focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 font-semibold text-stone-800 uppercase tracking-wide transition-colors cursor-pointer disabled:cursor-not-allowed";
  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",

    small: base + " px-1.5 py-1 md:px-3 md:py-1",

    round: base + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",

    secondary:
      "hover:bg-stone-300 text-sm hover:text-stone-800 px-4 md:px-6 py-2.5 md:py-3.5 border-2 border-stone-300 rounded-full outline-none focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 font-semibold text-stone-400 uppercase tracking-wide transition-colors cursor-pointer disabled:cursor-not-allowed",
  };
  if (to)
    return (
      <Link to={to} className={`${styles[type]} inline-block w-fit`}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
