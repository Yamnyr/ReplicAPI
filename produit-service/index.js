const express = require('express');
require('dotenv').config();
const produitRoutes = require('./routes/produitRoutes');

const app = express();
app.use(express.json());

app.use('/', produitRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Produit-service running on port ${PORT}`);
});
