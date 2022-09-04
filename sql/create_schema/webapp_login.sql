-- DOMAIN: public.AUTORIZZAZIONE

-- DROP DOMAIN IF EXISTS public."AUTORIZZAZIONE";

CREATE DOMAIN public."AUTORIZZAZIONE"
    AS character varying(10);

ALTER DOMAIN public."AUTORIZZAZIONE" OWNER TO postgres;

ALTER DOMAIN public."AUTORIZZAZIONE"
    ADD CONSTRAINT ruolo_check CHECK (VALUE::text = ANY (ARRAY['STUDENTE'::character varying, 'INSEGNANTE'::character varying]::text[]));

CREATE TABLE IF NOT EXISTS public.login
(
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character(64) COLLATE pg_catalog."default" NOT NULL,
    autorizzazione "AUTORIZZAZIONE" COLLATE pg_catalog."default" NOT NULL,
    enabled boolean NOT NULL DEFAULT true,
    CONSTRAINT "Login_pkey" PRIMARY KEY (username)
)

ALTER TABLE IF EXISTS public.login
    OWNER to webapp_user;