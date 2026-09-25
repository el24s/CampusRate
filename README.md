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
---

## Architecture du Projet

Le projet contient les éléments ci-dessous:

* Places - Gestion des lieux et services du campus
* Appreciations - Gestion des avis et notes associés aux lieux
* Commun - Services partagés et configuration du fichier JSON qui représente notre base de données temporaire


## Documentation
- Pour accéder à la documentation interactive SwaggerUI utiliser la commande `http://localhost:3000/docs`
