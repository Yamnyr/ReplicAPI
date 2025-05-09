const db = require('../config/db');

const getAllCommandes = async () => {
    const result = await db.query('SELECT * FROM commandes');
    return result.rows;
};

const createCommande = async (produit_id, quantite) => {
    const result = await db.query(
        'INSERT INTO commandes (produit_id, quantite) VALUES ($1, $2) RETURNING *',
        [produit_id, quantite]
    );
    return result.rows[0];
};

module.exports = {
    getAllCommandes,
    createCommande
};
