const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Redirection vers le User Service
app.use('/api/products', createProxyMiddleware({
    target: 'http://produit-service:4000',
    changeOrigin: true,
    pathRewrite: {
        '^/api/products': '/products',
    },
}));

app.use('/api/orders', createProxyMiddleware({
    target: 'http://commande-service:5000',
    changeOrigin: true,
    pathRewrite: {
        '^/api/orders': '/orders',
    },
}));


const PORT = process.env.GATEWAY_PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway démarrée sur le port ${PORT}`);
});
