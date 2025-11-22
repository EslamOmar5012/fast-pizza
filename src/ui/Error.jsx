import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error({ message = undefined }) {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{message || error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
