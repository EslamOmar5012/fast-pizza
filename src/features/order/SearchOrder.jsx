import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter order ID."
        className="bg-yellow-100 px-4 py-2 rounded-full focus:outline-none focus:ring focus:ring-yellow-800 focus:ring-offset-4 w-28 sm:focus:w-72 sm:w-64 focus:w-30 placeholder:text-stone-400 text-sm truncate transition-all duration-300"
      />
    </form>
  );
}

export default SearchOrder;
