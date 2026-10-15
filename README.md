# CampusRate API

## Stack Technique
* **Framework Backend :** NestJS (Architecture modulaire, CommonJS)
* **Langage :** TypeScript
* **Base de données :** MongoDB Atlas avec Mongoose
* **Validation des données :** `class-validator` & `class-transformer`, `joi` (variables d'environnement)
* **Sécurité :** Helmet, CORS, Throttler (rate limiting), HTTPS/TLS, JWT + RBAC
* **Journalisation :** Winston
* **Documentation API :** Swagger UI (`@nestjs/swagger`)

## Installation et Configuration

### 1. Prérequis
- **Node.js 22.12 ou plus récent** (LTS). Avec une version plus ancienne, certains paquets NestJS récents provoquent l'erreur `ERR_REQUIRE_ESM`.
- Un cluster **MongoDB Atlas** (ou une instance MongoDB locale)
- **OpenSSL** pour générer le certificat HTTPS

### 2. Installation des dépendances
```bash
npm install
```
```bash
npm install typescript --save-dev
npm install @nestjs/common
npm install class-validator class-transformer
npm install @nestjs/swagger
npm i @nestjs/mongoose mongoose @nestjs/config joi
npm i helmet @nestjs/throttler winston
npm i @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs
npm i -D @types/passport-jwt
```

### 3. Configuration (.env)
Créez un fichier `.env` à la racine, sur le modèle de `.env.example` :
```
PORT=3000
HTTP_PORT=3080
MONGO_URI=mongodb+srv://<utilisateur>:<motdepasse>@<cluster>.mongodb.net/campusrate
JWT_SECRET=<longue_chaine_aleatoire>
```
Au démarrage, `joi` vérifie que `MONGO_URI` et `JWT_SECRET` sont présents.

### 4. Commandes disponibles 
(start:dev, lint, build comme avant)

## Architecture du Projet
* Places : gestion des lieux et services du campus
* Appreciations : gestion des avis et notes associés aux lieux
* Auth : connexion, JWT, guards (authentification et rôles)
* Commun : filtre d'erreurs (`ProblemDetailsFilter`) et éléments partagés
* Middleware : journalisation des requêtes (`LoggerMiddleware`)

## Choix de conception (Contrat API)
| **Codes HTTP principaux** | `200`, `201`, `204`, `400` (validation), `401` (non authentifié), `403` (rôle insuffisant), `404`, `409`, `429` (trop de requêtes) | Sémantique HTTP standard. |

## Limites connues 
- Les utilisateurs (`user1`, `admin`...) sont stockés **en mémoire** dans `AuthService`. Il n'y a pas d'inscription, et ils disparaissent à chaque redémarrage.
- Le certificat HTTPS est auto-signé : les clients doivent accepter de ne pas le vérifier en développement.
- Le token JWT n'est pas révocable : il reste valide jusqu'à son expiration (1 h).

---

# Partie 2 

## Options choisies 
- H1 - Ajouter du Rate Limiting (4)
- H5 - Restreindre explicitement les méthodes HTTP autorisées (1)
- T1-T4 - HTTPS/TLS (10)
- L1-L2 - Journalisation des opérations: INFO et des erreurs ERROR (6)
- A1 - Authentification avec JWT (5)
- A2 - Autorisation avec RBAC (5)

## Changements par rapport au TP2
- Plus d'id codé en dur : MongoDB génère l'`_id` (24 caractères hexadécimaux).
- Les appréciations stockent le `userId` de leur auteur, pris dans le token.

## Sécurité de l'API
- **CORS** : seules les méthodes GET, POST, PATCH, DELETE sont autorisées (H5).
- **Helmet** : en-têtes de sécurité HTTP.

Vérification du CORS (le serveur ne doit pas renvoyer `Access-Control-Allow-Origin` pour cette origine) :
```bash
curl.exe -ik -H "ORIGIN: http://site-malveillant.com" https://localhost:3000/api/v1/places
```

## HTTPS / TLS et redirection  
- Générer le certificat et la clé dans `src/certs/` :
```bash
  openssl req -nodes -new -x509 -keyout server.key -out server.cert -days 365
```
- **ATTENTION : exclure `server.key`, `server.cert` et `.env` dans `.gitignore`.**
- L'API écoute en **HTTPS sur le port 3000**.
- Un petit serveur HTTP sur le **port 3080** redirige toute requête vers HTTPS avec un code `308` (qui conserve la méthode).
```bash
  curl.exe -i http://localhost:3080/api/v1/places
  # HTTP/1.1 308 Permanent Redirect
  # Location: https://localhost:3000/api/v1/places
```
- Le certificat est auto-signé : utiliser `-k` avec curl, ou désactiver la vérification SSL dans le client REST.

## Authentification JWT   
1. `POST /api/v1/auth/login` avec `{ "username": "...", "password": "..." }`
2. La réponse contient `{ "access_token": "..." }` (valide 1 h).
3. Envoyer le token sur les routes protégées : `Authorization: Bearer <token>`
   (Swagger : bouton **Authorize**. Client REST : onglet Auth → Bearer.)
4. `GET /api/v1/auth/profile` retourne l'utilisateur connecté.

## Autorisation RBAC
Deux rôles : `USER` et `ADMIN`.

| Route | Accès |
| :--- | :--- |
| `GET /places`, `GET /places/:id`, `GET /places/:placeId/appreciations` | Public |
| `POST`, `PATCH`, `DELETE /places` | ADMIN |
| `POST /places/:placeId/appreciations` | USER ou ADMIN |
| `PATCH`, `DELETE /places/:placeId/appreciations/:id` | USER (seulement ses propres appréciations) ou ADMIN (toutes : modération) |

Codes : `401` sans token ou token invalide, `403` si le rôle est insuffisant ou si l'appréciation appartient à un autre utilisateur.

## Rate Limiting  
Maximum **100 requêtes par minute** (`@nestjs/throttler`, guard global). Au-delà : `429 Too Many Requests`.

## Journalisation INFO & ERREURS  
- **INFO** : chaque requête est journalisée en JSON avec Winston (méthode, chemin, code de statut, durée, horodatage).
- **ERROR** : les erreurs sont journalisées par `ProblemDetailsFilter` (statut, méthode, chemin, message).
- Sortie : console [et fichier `logs/app.log` : à vérifier si activé].

---

## Documentation   
Swagger UI : `https://localhost:3000/docs`
Pour tester en tant qu'admin : `POST /auth/login` → copier le token → **Authorize** (coller seulement le token, sans `Bearer`).