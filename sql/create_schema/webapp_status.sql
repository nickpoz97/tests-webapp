-- Table: public.stato

-- DROP TABLE IF EXISTS public.stato;

CREATE TABLE IF NOT EXISTS public.stato
(
    timestamptest timestamp without time zone NOT NULL,
    nometest character varying COLLATE pg_catalog."default" NOT NULL,
    idutente character varying COLLATE pg_catalog."default" NOT NULL,
    idrisposta integer NOT NULL,
    nomedomanda character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT stato_pkey PRIMARY KEY (timestamptest, nometest, idutente, nomedomanda)
)

ALTER TABLE IF EXISTS public.stato
    OWNER to webapp_user;
