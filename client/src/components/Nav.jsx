import "../css/nav.css";
import { useUserContext } from "../context/UserContext";

import { useEffect } from "react";

function Nav() {
  const { user, logout } = useUserContext();

  useEffect(() => {
    console.log(user.id);
  });

  return (
    <div className="nav-container">
      <div className="logo">
        <a href="/">Logo</a>
      </div>

      <nav>
        <ul>
          <li>
            {" "}
            <a
              id="log-a"
              onClick={() => {
                if (user.id) {
                  logout();
                  document.getElementById("log-a").href = "/";
                } else {
                  document.getElementById("log-a").href = "/login";
                }
              }}
            >
              {user.id ? "Logout" : "Login"}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Nav;
