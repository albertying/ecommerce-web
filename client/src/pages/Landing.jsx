// import "../css/landing.css";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  width: 75vw;
`;

const ProductCard = styled.div`
  width: 30rem;
  height: 25rem;
  margin: 3rem;
  background-color: var(--light-gray);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProductText = styled.div`
  margin-top: 7rem;
  margin-right: 1rem;
  width: 15rem;
  height: 100%;
  position: absolute;
  right: 0px;
`;

const ProductPrice = styled.p`
  font-size: 3rem;
`;

const ProductImageWrapper = styled.div`
  width: 15rem;
  height: 20rem;
  background-color: #2f3c52;
  position: absolute;
  left: -3rem;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 17rem;
  object-fit: cover;
`;

const ProductButtonWrapper = styled(ProductText)`
  margin-top: 15rem;
  margin-right: 8rem;
  height: 3rem;
  width: 8rem;
`;

const CartButton = styled.button`
  width: 8rem;
  height: 3rem;
  border: 0;
  border-radius: 5px;
  background-color: var(--dark-gray);
  color: white;
  cursor: pointer;
`;

function Landing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/products/get"
      );
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <Wrapper>
      <ProductWrapper>
        {products.map((product) => {
          return (
            <ProductCard key={product.product_id}>
              <ProductText>
                <h4>{product.product_name}</h4>
                <ProductPrice>${product.product_price}</ProductPrice>
                <p>{product.product_description}</p>
              </ProductText>

              <ProductButtonWrapper>
                <CartButton>Add to cart</CartButton>
              </ProductButtonWrapper>

              <ProductImageWrapper>
                <ProductImage src="" />
              </ProductImageWrapper>
            </ProductCard>
          );
        })}
      </ProductWrapper>
    </Wrapper>
  );
}
export default Landing;
