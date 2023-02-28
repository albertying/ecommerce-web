// import "../css/nav.css";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import Cart from "./Cart";

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

const Left = styled.div`
  margin-left: 20rem;
`;

const Right = styled.nav`
  margin-right: 20rem;
  ul {
    display: flex;
  }
  li {
    margin: 0 1rem;
    list-style: none;
  }
`;

function Nav() {
  const { user, logout } = useUserContext();

  return (
    <Wrapper>
      <Left>
        <a href="/">Logo</a>
      </Left>

      <Right>
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
          <li>{user.id ? <Cart /> : null}</li>
        </ul>
      </Right>
    </Wrapper>
  );
}
export default Nav;
