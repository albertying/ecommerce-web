import pool from "../db/db.js";

const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const newProduct = await pool.query(
      "INSERT INTO products (product_name, product_price, product_description) VALUES ($1, $2, $3) RETURNING *",
      [name, price, description]
    );

    res.json(newProduct.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    res.json(products.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [id]
    );
    if (product.rows.length === 0) {
      return res.json({ error: "Product does not exist" });
    }

    res.json(product.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export { createProduct, getProducts, getProduct };
