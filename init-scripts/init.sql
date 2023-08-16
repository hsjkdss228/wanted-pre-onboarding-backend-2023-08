CREATE DATABASE IF NOT EXISTS db;
USE db;

CREATE TABLE users(
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE posts(
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    title VARCHAR(255),
    description_text VARCHAR(4095),
    deleted BOOLEAN DEFAULT FALSE
);