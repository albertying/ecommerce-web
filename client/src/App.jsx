import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Nav from "./components/Nav";
import Cart from "./pages/Cart";
import "./css/reset.css";
import "./css/app.css";
import Profile from "./pages/Profile";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { UserProvider } from "./context/UserContext";

function AppLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return (
    <div className="app-container">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}
export default App;
