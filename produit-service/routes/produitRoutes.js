const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitController');

router.get('/', produitController.getProduits);
router.post('/', produitController.addProduit);

module.exports = router;
