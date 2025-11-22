import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { useSelector } from "react-redux";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const cartQuantity = useSelector(
    (store) =>
      store.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity ?? 0
  );

  return (
    <li className="sm:flex sm:justify-between sm:items-center py-3">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-2 sm:gap-6">
        <p className="font-bold text-sm">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={cartQuantity}
        ></UpdateItemQuantity>

        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
