const express = require('express');
require('dotenv').config();
const commandeRoutes = require('./routes/commandeRoutes');

const app = express();
app.use(express.json());

app.use('/', commandeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Commande-service running on port ${PORT}`);
});
