import "../css/nav.css";
import { useUserContext } from "../context/UserContext";

import { useEffect } from "react";

function Nav() {
  const { user, logout } = useUserContext();

  useEffect(() => {
    console.log(user.id);
  });

  return (
    <div>
      <nav>
        <ul className="left">
          <li>
            <a href="/">
              <strong className="log-a">Placeholder</strong>
            </a>
          </li>
        </ul>
        <ul className="right">
          <a
            className="log-a"
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
        </ul>
      </nav>
    </div>
  );
}
export default Nav;
