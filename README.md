# ReplicAPI

## Architecture

Le projet est composé de plusieurs services Dockerisés :

- **produit-service** : Microservice Node.js pour la gestion des produits (PostgreSQL).
- **commande-service** : Microservice Node.js pour la gestion des commandes (PostgreSQL).
- **gateway** : API Gateway Node.js (Express + http-proxy-middleware) qui redirige les requêtes vers les microservices.
- **primary** : Instance PostgreSQL principale (master).
- **replica** : Instance PostgreSQL répliquée (slave).
- **pgpool** : Load balancer (PgPool) pour distribuer les requêtes entre primary et replica, et gérer le failover.

Le schéma de connexion :

```
[frontend] → [gateway] → [produit-service | commande-service] → [pgpool] → [primary/replica]
```

## Lancement du projet

1. **Cloner le dépôt**

   ```bash
   git clone <repo-url>
   cd ReplicAPI
   ```

2. **Lancer l’ensemble des services**

   ```bash
   docker-compose up --build
   ```

   Cela va :

   - Construire les images des microservices et de la gateway.
   - Démarrer les bases de données (primary, replica) et PgPool.
   - Initialiser les schémas de base de données via `initdb/init.sql`.

3. **Accéder aux services**
   - **Frontend** (si développé) : http://localhost:3000
   - **Produit-service** : http://localhost:4000
   - **Commande-service** : http://localhost:5000
   - **PgPool** (PostgreSQL load balancer) : localhost:5433

## Tester la réplication et le failover

### 1. Vérifier la réplication

Connectez-vous à pgAdmin 4 :

- Connectez-vous au primary et ajoutez un produit (port 5432) :
  ```sql
  INSERT INTO produits (name) VALUES ('Produit Test');
  ```
- Connectez-vous à la **replica** (port 5434) et vérifiez que le produit ajouté est bien présent :
  ```sql
  SELECT * FROM produits;
  ```
  Si la ligne apparaît, la réplication fonctionne.

### 2. Tester le failover

- Arrêtez le conteneur `primary` :
  ```bash
  docker-compose stop primary
  ```
- PgPool va automatiquement basculer sur la replica (en lecture seule).
- Essayez de faire une requête d’écriture (POST produit ou commande) :  
  Vous devriez obtenir une erreur (la replica est en lecture seule).
- Redémarrez le primary :
  ```bash
  docker-compose start primary
  ```
- PgPool rebascule automatiquement sur le primary pour les écritures.

## Commandes utiles

- **Voir les logs d’un service** :
  ```bash
  docker-compose logs -f produit-service
  ```
- **Redémarrer un service** :
  ```bash
  docker-compose restart pgpool
  ```

## Notes

- Les variables d’environnement sont configurées dans chaque dossier de service (`.env`).
- Le schéma des bases est initialisé automatiquement au démarrage via `initdb/init.sql`.
- Lien Trello : https://trello.com/invite/b/6821a62c37b46d198909dfb2/ATTI5a41cac860dcd76c8dcdb8caf18a3531F6F5ADDC/replicapi

---
