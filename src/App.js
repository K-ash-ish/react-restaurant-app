import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Body from "./components/Body";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import RestaurantPage from "./components/RestaurantPage";
import { store } from "./app/store";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  location,
  LocationContext,
  setLocation,
} from "./context/LocationContext";
import { useState } from "react";
function AppLayout() {
  const [location, setLocation] = useState();
  return (
    <Provider store={store}>
      <LocationContext.Provider
        value={{ location: location, setLocation: setLocation }}
      >
        <div className=" flex flex-col justify-between items-center   min-h-screen md:min-h-screen">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </LocationContext.Provider>
    </Provider>
  );
}

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Body />,
//       },
//       {
//         path: "/cart",
//         element: <Cart />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//     ],
//   },
// ]);
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element=<AppLayout />>
        <Route path="/" element=<Body /> />
        <Route path="login" element=<Login /> />
        <Route path="cart" element=<Cart /> />
        <Route
          path="restaurant/:id"
          element=<RestaurantPage />
          errorElement={<ErrorBoundary />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
