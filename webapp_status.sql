CREATE DATABASE webapp_status
    WITH
    OWNER = webapp_user
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS stato;

CREATE TABLE stato(
	timestampTest TIMESTAMP,
	nomeTest VARCHAR,
	idUtente VARCHAR,
	idRisposta INTEGER,
	PRIMARY KEY(timestampTest, nomeTest, idUtente, idRisposta)
);
