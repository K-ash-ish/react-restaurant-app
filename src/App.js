import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Body from "./components/Body";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
function AppLayout() {
  return (
    <div className=" flex flex-col justify-between min-h-screen md:min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
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
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
