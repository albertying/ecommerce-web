// import "../css/nav.css";
import { useUserContext } from "../context/UserContext";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 3rem;
  background-color: #1b2432;
  color: #fff;
  font-family: "Poppins", sans-serif;
  position: fixed;
  z-index: 1;
`;

const Logo = styled.div`
  margin-left: 20rem;
`;

const NavWrapper = styled.nav`
  margin-right: 20rem;
`;

function Nav() {
  const { user, logout } = useUserContext();

  return (
    <Wrapper>
      <Logo>
        <a href="/">Logo</a>
      </Logo>

      <NavWrapper>
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
      </NavWrapper>
    </Wrapper>
  );
}
export default Nav;
