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
            <strong>Placeholder</strong>
          </li>
        </ul>
        <ul className="right">
          <li>
            <a
              className="log-a"
              onClick={() => {
                if (user.id) {
                  logout();
                }
              }}
              href={user.id ? "/" : "login"}
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
