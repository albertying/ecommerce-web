import "../css/nav.css";
import { useUserContext } from "../context/UserContext";

function Nav() {
  const { user, logout } = useUserContext();

  return (
    <div className="nav-container">
      <div className="logo">
        <a href="/">Logo</a>
      </div>

      <nav>
        <ul>
          <li>
            <a
              id="log-a"
              href="/login"
              onClick={() => {
                if (user.id) {
                  logout();
                  document.getElementById("log-a").href = "/";
                } else {
                  document.getElementById("log-a").href = "/login"; //if user is not logged in, route to login page
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
