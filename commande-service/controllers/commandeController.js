const commandeModel = require('../models/commandeModel');

// const getCommandes = async (req, res) => {
//     try {
//         const commandes = await commandeModel.getAllCommandes();
//         res.json(commandes);
//     } catch (error) {
//         console.error('❌ Error in getCommandes:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const getCommandes = async (req, res) => {
    console.log('📥 Requête reçue dans getCommandes');
    res.json([{ id: 1, name: 'Commande A' }]);
};
const addCommande = async (req, res) => {
    const { produit_id, quantite } = req.body;
    try {
        const newCommande = await commandeModel.createCommande(produit_id, quantite);
        res.status(201).json(newCommande);
    } catch (error) {
        console.error('❌ Error in addCommande:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getCommandes,
    addCommande
};
