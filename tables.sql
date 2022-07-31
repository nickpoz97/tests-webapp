-- Role: webapp_user
-- DROP ROLE IF EXISTS webapp_user;

CREATE ROLE webapp_user WITH
    LOGIN
    SUPERUSER
    INHERIT
    CREATEDB
    CREATEROLE
    NOREPLICATION
    ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:3eJdJNdEYT0XDvsmm+79Dw==$37MbYGv1KsC+rx0mm0VJgX726bfim9jPnVzpxvc5w9Y=:rq4cnslWVkM2nj7d6LkjFFPPajPir2DyeaVu9h2KBRk=';

-- Database: webapp
-- DROP DATABASE IF EXISTS webapp;

CREATE DATABASE webapp
    WITH
    OWNER = webapp_user
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- create tables for the database

CREATE TABLE Test (
    data TIMESTAMP WITH TIME ZONE NOT NULL ,
    nome VARCHAR NOT NULL ,
    ordineCasuale BOOLEAN DEFAULT FALSE , --le domande devono essere presentate in ordine casuale
    domandeConNumero BOOLEAN DEFAULT FALSE , --le domande devono essere numerate
    PRIMARY KEY (data , nome )
);
CREATE TABLE Domanda (
    nome VARCHAR PRIMARY KEY ,
    testo VARCHAR NOT NULL ,
    punti DECIMAL (5 ,2) , -- quanti punti vale la domanda . Esempio : 2.0
    ordineCasuale BOOLEAN DEFAULT FALSE , -- le risposte devono essere presentate in ordine casuale
    risposteConNumero BOOLEAN DEFAULT FALSE --le risposte devono essere numerate
);
CREATE TABLE Risposta (
    id serial PRIMARY KEY ,
    testo VARCHAR NOT NULL ,
    punteggio DECIMAL (5 ,4) CHECK ( punteggio <= 1.0) , -- percentuale dei punti della domanda
    domanda VARCHAR REFERENCES Domanda
);
CREATE TABLE InTest (
    domanda VARCHAR REFERENCES Domanda ,
    dataTest TIMESTAMP NOT NULL ,
    nomeTest VARCHAR NOT NULL ,
    FOREIGN KEY ( dataTest , nomeTest ) REFERENCES Test
);
