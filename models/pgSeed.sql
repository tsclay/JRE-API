DROP DATABASE IF EXISTS jre_keys;
DROP USER IF EXISTS jamie;

CREATE USER jamie WITH PASSWORD 'higherPrimate';

CREATE DATABASE jre_keys;
ALTER DATABASE jre_keys OWNER TO jamie;

\c jre_keys;

CREATE TABLE keys
(id SERIAL, name VARCHAR(255), email TEXT PRIMARY KEY, api_key VARCHAR(100));
ALTER TABLE keys OWNER TO jamie;

INSERT INTO keys (name, email, api_key) VALUES
('Tim Clay', 'timclay@me.com', '14kewoi541acnsd'),
('John Doe', 'johndoe@me.com', '109djqpoeir'),
('Jane Smith', 'janesmith@me.com', 'mnzbclapor91824');