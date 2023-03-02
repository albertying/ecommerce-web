import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  width: 50%;
`;

const CartCard = styled.div`
  width: 40rem;
  height: 10rem;
  background-color: var(--light-gray);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

function Cart() {
  const [cart, setCart] = useState([]);

  const { token } = useUserContext();

  useEffect(() => {
    const getCartCount = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/orders/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(data);
    };
    getCartCount();
  }, []);

  return (
    <Wrapper>
      <CartWrapper>
        {cart.map((item) => {
          return (
            <CartCard key={item.order_id}>
              <h1>{item.order_product_id}</h1>
            </CartCard>
          );
        })}
      </CartWrapper>
    </Wrapper>
  );
}
export default Cart;
