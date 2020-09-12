BEGIN TRANSACTION;

CREATE TABLE users(
    id serial PRIMARY KEY, 
    name varchar(100), 
    email varchar(200) unique not null, 
    entries bigint default 0, 
    joined timestamp not null
);

COMMIT;