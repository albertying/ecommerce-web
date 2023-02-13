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