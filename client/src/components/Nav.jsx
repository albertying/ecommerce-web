import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import Cart from "./Cart";
import { Link } from "react-router-dom";

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
        <Link to="/">Logo</Link>
      </Left>

      <Right>
        <ul>
          <li>
            <Link to={user.id ? "/" : "/login"} onClick={logout}>
              {user.id ? "Logout" : "Login"}
            </Link>
          </li>
          <li>{user.id ? <Cart /> : null}</li>
        </ul>
      </Right>
    </Wrapper>
  );
}
export default Nav;
