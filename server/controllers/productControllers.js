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

export { createProduct };
