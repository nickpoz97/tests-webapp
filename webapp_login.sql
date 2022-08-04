-- Database: webapp_login

-- DROP DATABASE IF EXISTS webapp_login;

CREATE DATABASE webapp_login
    WITH
    OWNER = webapp_user
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE DOMAIN Ruolo AS VARCHAR(10)
    CHECK (UPPER(value) in ('studente', 'insegnante'));

CREATE TABLE IF NOT EXISTS login
(
    username VARCHAR PRIMARY KEY,
    password CHAR(64) NOT NULL,
    ruolo RUOLO NOT NULL,
)

ALTER TABLE IF EXISTS Login
    OWNER to webapp_user;
