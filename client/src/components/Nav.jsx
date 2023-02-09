import "../css/nav.css";
import { useUserContext } from "../context/UserContext";

function Nav() {
  const { user, logout } = useUserContext();
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
            {user ? (
              <a
                href="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </a>
            ) : null}
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Nav;
