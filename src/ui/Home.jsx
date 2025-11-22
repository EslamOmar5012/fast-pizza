import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="my-10 sm:my-16 px-4 text-center">
      <h1 className="mb-8 font-semibold text-stone-700 text-xl md:text-3xl text-center">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, Straight to you.
        </span>
      </h1>
      {username ? (
        <Button to="/menu" type="primary">
          Continue Ordering, {username}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
