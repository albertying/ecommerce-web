import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Nav from "./components/Nav";
import "./css/reset.css";
import "./css/app.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./context/UserContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <div className="app-container">
      <UserProvider>
        <Nav />
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}
export default App;
