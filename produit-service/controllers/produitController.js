const produitModel = require('../models/produitModel');

const getProduits = async (req, res) => {
    try {
        const produits = await produitModel.getAllProduits();
        res.json(produits);
    } catch (error) {
        console.error('❌ Error in getProduits:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const addProduit = async (req, res) => {
    const { name } = req.body;
    try {
        const newProduit = await produitModel.createProduit(name);
        res.status(201).json(newProduit);
    } catch (error) {
        console.error('❌ Error in addProduit:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getProduits,
    addProduit
};
