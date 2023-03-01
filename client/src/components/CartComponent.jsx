import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart } = useUserContext();

  return <Link to="/cart">{cart.itemCount}</Link>;
}
export default Cart;
