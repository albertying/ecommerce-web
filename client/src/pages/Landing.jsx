import "../css/landing.css";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="landing-container">
      <div className="product-container">
        {products.map((product) => {
          return (
            <div className="product-card" key={product.product_id}>
              <div className="product-text">
                <h4>{product.product_name}</h4>
                <p>{product.product_description}</p>
                <p>${product.product_price}</p>
              </div>
              <div className="product-image"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Landing;
