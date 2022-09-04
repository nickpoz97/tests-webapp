-- Database: webapp_data

-- DROP DATABASE IF EXISTS webapp_data;

CREATE DATABASE webapp_data
    WITH
    OWNER = webapp_user
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Database: webapp_login

-- DROP DATABASE IF EXISTS webapp_login;

CREATE DATABASE webapp_login
    WITH
    OWNER = webapp_user
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Database: webapp_status

-- DROP DATABASE IF EXISTS webapp_status;

CREATE DATABASE webapp_status
    WITH
    OWNER = webapp_user
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;