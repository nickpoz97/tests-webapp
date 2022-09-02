-- Database: webapp_login

-- DROP DATABASE IF EXISTS webapp_login;

CREATE DATABASE webapp_login
    WITH
    OWNER = webapp_user
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE DOMAIN Autorizzazione AS VARCHAR(10)
    CHECK (value in ('STUDENTE', 'INSEGNANTE'));

CREATE TABLE IF NOT EXISTS login
(
    username VARCHAR PRIMARY KEY,
    password CHAR(64) NOT NULL,
    autorizzazione Autorizzazione NOT NULL,
    enabled boolean NOT NULL DEFAULT true
)

ALTER TABLE IF EXISTS Login
    OWNER to webapp_user;
