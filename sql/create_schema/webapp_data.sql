-- Table: public.domanda

-- DROP TABLE IF EXISTS public.domanda;

CREATE TABLE IF NOT EXISTS public.domanda
(
    nome character varying COLLATE pg_catalog."default" NOT NULL,
    testo character varying COLLATE pg_catalog."default" NOT NULL,
    punti numeric(5,2),
    ordinecasuale boolean DEFAULT false,
    risposteconnumero boolean DEFAULT false,
    CONSTRAINT domanda_pkey PRIMARY KEY (nome)
)

ALTER TABLE IF EXISTS public.domanda
    OWNER to webapp_user;

-- Table: public.test

-- DROP TABLE IF EXISTS public.test;

CREATE TABLE IF NOT EXISTS public.test
(
    data timestamp without time zone NOT NULL,
    nome character varying COLLATE pg_catalog."default" NOT NULL,
    ordinecasuale boolean DEFAULT false,
    domandeconnumero boolean DEFAULT false,
    CONSTRAINT test_pkey PRIMARY KEY (data, nome)
)

ALTER TABLE IF EXISTS public.test
    OWNER to webapp_user;

-- Table: public.risposta

-- DROP TABLE IF EXISTS public.risposta;

CREATE TABLE IF NOT EXISTS public.risposta
(
    id integer NOT NULL DEFAULT nextval('risposta_id_seq'::regclass),
    testo character varying COLLATE pg_catalog."default" NOT NULL,
    punteggio numeric(5,4),
    domanda character varying COLLATE pg_catalog."default",
    CONSTRAINT risposta_pkey PRIMARY KEY (id),
    CONSTRAINT risposta_domanda_fkey FOREIGN KEY (domanda)
    REFERENCES public.domanda (nome) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT risposta_punteggio_check CHECK (punteggio <= 1.0)
)
ALTER TABLE IF EXISTS public.risposta
    OWNER to webapp_user;

-- Table: public.intest

-- DROP TABLE IF EXISTS public.intest;

CREATE TABLE IF NOT EXISTS public.intest
(
    domanda character varying COLLATE pg_catalog."default",
    datatest timestamp without time zone NOT NULL,
    nometest character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT intest_datatest_nometest_fkey FOREIGN KEY (datatest, nometest)
    REFERENCES public.test (data, nome) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT intest_domanda_fkey FOREIGN KEY (domanda)
    REFERENCES public.domanda (nome) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
)

ALTER TABLE IF EXISTS public.intest
    OWNER to webapp_user;
