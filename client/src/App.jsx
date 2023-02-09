import Login from "./pages/Login";
import Home from "./pages/Home";
import Nav from "./components/Nav";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./context/UserContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <UserProvider>
      <Nav />
      <RouterProvider router={router} />
    </UserProvider>
  );
}
export default App;
