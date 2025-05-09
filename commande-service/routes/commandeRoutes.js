const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

router.get('/', commandeController.getCommandes);
router.post('/', commandeController.addCommande);

module.exports = router;
