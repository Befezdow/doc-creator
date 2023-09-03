psql -h localhost -p 5432 --user postgres

CREATE USER test WITH PASSWORD 'test';
CREATE DATABASE "doc-creator" OWNER test;