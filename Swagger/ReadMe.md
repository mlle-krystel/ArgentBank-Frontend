Argent Bank – Phase 2 : Gestion des transactions (Swagger 2.0)

Ce livrable correspond à la phase 2 du projet Argent Bank.

L’objectif de cette phase est de concevoir et documenter les routes API nécessaires à la gestion des transactions (sans implémenter l’écran Transactions), en restant cohérent avec l’API fournie et l’authentification JWT.

Contenu du livrable

Phase 1 : application React/Redux fonctionnelle (connexion, profil protégé, modification du username).

Phase 2 : un fichier de spécification Swagger 2.0 :

Swagger.yaml (dans le dossier Swagger/ ou à la racine selon ton repo)

Contexte technique (d’après Swagger.yaml)

Swagger version : swagger: '2.0'

Host : localhost:3001

Base path : /api/v1

Scheme : http

➡️ Donc toutes les routes documentées sont accessibles sous la forme :
http://localhost:3001/api/v1/...

Objectifs fonctionnels

L’API doit permettre à un utilisateur authentifié de :

visualiser les transactions d’un compte (mois courant, ou filtrable si un paramètre est prévu)

afficher le détail d’une transaction

modifier des informations additionnelles liées à une transaction (ex : category, note)

supprimer ces informations additionnelles sans supprimer la transaction elle-même

Aucune création ni suppression de transaction n’est prévue dans ce livrable.

Authentification (JWT Bearer)

Les endpoints sensibles utilisent un token JWT transmis via :

Authorization: Bearer <token>

Routes Transactions (résumé)

Les routes ci-dessous sont à lire avec le préfixe /api/v1.

GET /transactions/{accountId}
Récupère les transactions liées à un compte.

GET /transactions/{accountId}/{transactionId}
Récupère le détail d’une transaction.

PATCH /transactions/{accountId}/{transactionId}
Met à jour partiellement des métadonnées (category, note).

DELETE /transactions/{accountId}/{transactionId}
Supprime les métadonnées (category, note) sans supprimer la transaction.

Pourquoi cette conception ?

Les paramètres accountId et transactionId dans l’URL identifient clairement la ressource ciblée (approche REST lisible).

PATCH correspond à une modification partielle (on ne remplace pas toute la transaction).

DELETE supprime uniquement les métadonnées, conformément au besoin (on ne supprime pas une transaction bancaire dans ce scope).

Limites / améliorations possibles

Le “mois courant” peut être rendu explicite via un paramètre de requête (ex : ?month=YYYY-MM) si besoin.

Les schémas de réponse pourraient être enrichis (codes 401/403/404, messages plus détaillés) selon les conventions backend.

Validation

Le fichier Swagger.yaml est au format Swagger 2.0 et peut être importé dans Swagger Editor pour vérifier la structure et la documentation des endpoints.