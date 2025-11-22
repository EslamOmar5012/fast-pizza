import { Form, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);

  const isLoadingAddress = addressStatus === "loading";

  const dispatch = useDispatch();

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((store) => store.cart.cart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const periorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const formErrors = useActionData();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 font-semibold text-xl">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="flex sm:flex-row flex-col sm:items-center gap-2 mb-5">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="flex sm:flex-row flex-col sm:items-center gap-2 mb-5">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="w-full input" />
            {formErrors?.phone && (
              <p className="bg-red-100 mt-2 p-2 rounded-md text-red-700 text-xs">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex sm:flex-row flex-col sm:items-center gap-2 mb-5">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
              className="w-full input"
            />

            {addressStatus === "error" && (
              <p className="bg-red-100 mt-2 p-2 rounded-md text-red-700 text-xs">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="top-[3px] sm:top-2.5 right-[5px] sm:right-[5px] z-50 absolute">
              <Button
                disabled={isLoadingAddress || isSubmitting}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-5 mb-12">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 w-6 h-6 accent-yellow-400"
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(
                  totalCartPrice + periorityPrice
                )}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
