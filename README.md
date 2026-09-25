# CampusRate API

> Backend de l'application **CampusRate**, une solution développée avec NestJS permettant aux étudiants de consulter les lieux et services du campus et de partager leurs appréciations.

---

## Stack Technique

* **Framework Backend :** NestJS (Architecture modulaire, CommonJS)
* **Langage :** TypeScript
* **Validation des données :** `class-validator` & `class-transformer`
* **Documentation API :** Swagger UI (`@nestjs/swagger`)

---

## Installation et Configuration

Suivez les étapes ci-dessous pour installer et exécuter le projet localement.

### 1. Prérequis
Assurez-vous d'avoir installé **Node.js** sur votre machine.

### 2. Installation des dépendances
Exécutez les commandes suivantes dans votre terminal :

```bash
# Installation des paquets principaux
npm install

# Installation des paquets additionnels (si nécessaire)
npm install typescript --save-dev
npm install @nestjs/common
npm install class-validator class-transformer
npm install @nestjs/swagger

```
### Configuration (.env)
Créez un fichier `.env` à la racine du projet en vous basant sur `.env.example` :
- `PORT=4000`
- `DATA_FILE_PATH=./src/data/campus-rate.json`

### Commandes disponibles
```bash
# Lancer l'application en mode développement
npm run start:dev

# Vérifier le code (Lint)
npm run lint

# Compiler l'application (Build)
npm run build

```
## Architecture du Projet

Le projet contient les éléments ci-dessous:

* Places - Gestion des lieux et services du campus
* Appreciations - Gestion des avis et notes associés aux lieux
* Commun - Services partagés et configuration du fichier JSON qui représente notre base de données temporaire

--- 

## Choix de conception (Contrat API)

| Élément | Choix retenu | Justification / Règle REST |
| :--- | :--- | :--- |
| **Noms des ressources** | Pluriel en anglais (`places`, `appreciations`) | Standard REST pour représenter des collections de ressources. |
| **Versionnement** | Dans le chemin (`/api/v1/...`) | Permet d'assurer la rétrocompatibilité des clients en cas d'évolution majeure. |
| **Imbrication** | `/places/{placeId}/appreciations` | Exprime la relation forte d'appartenance d'une appréciation envers un endroit spécifique. |
| **Codes HTTP principaux** | `201` (Création), `204` (Suppression), `404` (Non trouvé), `409` (Conflit) | Respect strict de la sémantique HTTP standard. |


## Limites connues
- La persistance s'appuie sur un fichier JSON local unique, ce qui n'est pas optimisé pour de la haute concurrence en production.
- Pas de système d'authentification des utilisateurs (le nom d'auteur est simplement saisi sous forme de chaîne de caractères).

---

## Documentation
- Pour accéder à la documentation interactive SwaggerUI utiliser la commande `http://localhost:3000/docs`
