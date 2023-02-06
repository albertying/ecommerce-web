import { Home, Login } from "./pages/index";

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
      <RouterProvider router={router} />
    </UserProvider>
  );
}
export default App;
