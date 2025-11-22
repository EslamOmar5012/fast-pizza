import { Link } from "react-router-dom";
import UserName from "../features/user/UserName";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <header className="flex justify-between items-center bg-yellow-400 px-4 sm:px-6 py-3 border-stone-500 border-b uppercase">
      <Link to="/" className="tracking-wide">
        Fast Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
