const db = require("../config/db")

const getAllProduits = async () => {
    // Utilisation du pool de lecture pour les opérations SELECT
    const result = await db.query("SELECT * FROM produits")
    return result.rows
}

const createProduit = async (name) => {
    // Utilisation du pool d'écriture pour les opérations INSERT
    const result = await db.writeQuery("INSERT INTO produits (name) VALUES ($1) RETURNING *", [name], "create_produit")
    return result.rows[0]
}

module.exports = {
    getAllProduits,
    createProduit,
}
