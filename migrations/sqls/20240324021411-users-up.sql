CREATE TABLE users {
    id SERIAL PRIMARY KEY,
    username varchar(25) NOT NULL,
    firstname varchar(50) NOT NULL,
    lastname varchar(50) NOT NULL,
    password_digest varchar(50) NOT NULL
}