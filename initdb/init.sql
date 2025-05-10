CREATE DATABASE produits_db;
\c produits_db;
CREATE TABLE IF NOT EXISTS produits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE DATABASE commandes_db;
\c commandes_db;
CREATE TABLE IF NOT EXISTS commandes (
    id SERIAL PRIMARY KEY,
    produit_id INTEGER NOT NULL,
    quantite INTEGER NOT NULL
);
