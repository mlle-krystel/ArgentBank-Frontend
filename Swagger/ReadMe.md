# Argent Bank – Phase 2 : Gestion des transactions

Ce livrable correspond à la phase 2 du projet Argent Bank.

L’objectif est de proposer un document décrivant les routes API nécessaires à la gestion des transactions, en respectant les consignes données dans le brief.


## Contenu du livrable

- Application React/Redux fonctionnelle (Phase 1)
- Un fichier Swagger nommé `Swagger.yaml`, situé dans le dossier `swagger/` à la racine du projet


## Objectifs fonctionnels

L’API doit permettre de :

- visualiser toutes les transactions d’un compte, pour un mois donné
- afficher le détail d’une transaction (type, catégorie, note…)
- modifier une transaction (changer la catégorie ou ajouter une note)

Aucune création ni suppression de transaction n’est prévue.


## Détail des routes définies

**1.** `GET /user/{userId}/accounts/{accountId}/transactions`  
→ Liste des transactions pour un compte, filtrables par mois et année

**2.** `GET /transactions/{transactionId}`  
→ Détail complet d’une transaction spécifique

**3.** `PATCH /transactions/{transactionId}`  
→ Mise à jour partielle d’une transaction (champ `note` ou `category`)


## Format

- Fichier `Swagger.yaml`
- Format : OpenAPI 3.0.1
- Validé dans Swagger Editor


## Remarques

La maquette a servi de support pour identifier les besoins fonctionnels, mais la page Transactions n’a pas été implémentée car ce n’était pas demandé à cette étape.

