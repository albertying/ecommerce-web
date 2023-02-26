import pool from "../db/db.js";

const createOrder = async (req, res) => {
  try {
    const { orderProductId, orderQuantity, orderTotal } = req.body;
    const newOrder = await pool.query(
      "INSERT INTO orders (order_user_id, order_product_id, order_quantity, order_total) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user, orderProductId, orderQuantity, orderTotal]
    );
    res.json(newOrder.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const allOrders = await pool.query(
      "SELECT * FROM orders WHERE order_user_id = $1",
      [req.user]
    );
    res.json(allOrders.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export { createOrder, getOrders };
