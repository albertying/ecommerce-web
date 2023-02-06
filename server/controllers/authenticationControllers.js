import pool from "../db/db.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.json({ error: "User already exists" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.json({ error: err.message });
      }
      const newUser = await pool.query(
        "INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING *",
        [email, hash]
      );
      res.json(newUser.rows[0]);
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.json({ error: "User does not exist" });
    }
    bcrypt.compare(password, user.rows[0].user_password, (err, result) => {
      if (err) {
        res.json({ error: err.message });
      }
      if (result) {
        res.json(user.rows[0]);
      } else {
        res.json({ error: "Password is incorrect" });
      }
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export { register, login };
