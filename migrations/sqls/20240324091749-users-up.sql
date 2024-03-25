CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(250) NOT NULL,
    firstname varchar(250) NOT NULL,
    lastname varchar(250) NOT NULL,
    password_digest varchar(250) NOT NULL
);
