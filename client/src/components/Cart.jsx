import { useUserContext } from "../context/UserContext";

function Cart() {
  const { cart } = useUserContext();

  return <div>{cart.itemCount}</div>;
}
export default Cart;
