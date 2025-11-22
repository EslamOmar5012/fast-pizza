import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="hidden md:block font-semibold text-sm">
      {username || "Guest"}
    </div>
  );
}

export default UserName;
