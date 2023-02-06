CREATE DATABASE ecommerce;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
);