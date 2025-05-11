const db = require("../config/db")

const getAllProduits = async () => {
    const result = await db.query('SELECT * FROM produits');
    return result.rows;
};

const createProduit = async (name) => {
    const result = await db.query(
        'INSERT INTO produits (name) VALUES ($1) RETURNING *',
        [name]
    );
    return result.rows[0];
};

module.exports = {
    getAllProduits,
    createProduit,
}
