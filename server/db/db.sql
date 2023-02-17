CREATE DATABASE ecommerce;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  product_description VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  order_user_id INTEGER NOT NULL,
  order_product_id INTEGER NOT NULL,
  order_quantity INTEGER NOT NULL,
  order_total DECIMAL(10,2) NOT NULL,
  order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_user_id) REFERENCES users(user_id),
  FOREIGN KEY (order_product_id) REFERENCES products(product_id)
);