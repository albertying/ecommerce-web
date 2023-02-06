import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "password",
  database: "ecommerce",
  port: 5432,
});

export default pool;
