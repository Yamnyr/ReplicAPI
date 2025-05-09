FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port utilisé par la gateway (3000 par défaut)
EXPOSE 3000

# Lancer l'application
CMD ["node", "app.js"]
