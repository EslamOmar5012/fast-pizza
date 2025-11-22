import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { createOrder, getMenu, getOrder } from "./services/apiRestaurant";

import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import Error from "./ui/Error";
import Loader from "./ui/Loader";
import { Provider } from "react-redux";
import { store } from "./store";
import { clearCart } from "./features/cart/cartSlice";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <Home /> },
      {
        path: "menu",
        element: <Menu />,
        loader: async () => {
          const menu = await getMenu();
          return menu;
        },
      },
      { path: "cart", element: <Cart /> },
      {
        path: "order/new",
        element: <CreateOrder />,
        action: async ({ request }) => {
          const data = await request.formData();

          const dataObj = Object.fromEntries(data);

          const order = {
            ...dataObj,
            cart: JSON.parse(dataObj.cart),
            priority: dataObj.priority === "true",
          };

          console.log(order);

          const errors = {};

          if (!isValidPhone(order.phone))
            errors.phone =
              "Please give us your correct phone number. We might need it to contact you.";

          if (Object.keys(errors).length > 0) return errors;

          const res = await createOrder(order);

          store.dispatch(clearCart());

          return redirect(`/order/${res.id}`);
        },
      },
      {
        path: "order/:orderId",
        element: <Order />,
        errorElement: <Error />,
        loader: async ({ params }) => {
          const order = await getOrder(params.orderId);
          return order;
        },
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
