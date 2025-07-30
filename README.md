# Projet Docker CI/CD – TODO LIST
Ce projet a été réalisé dans le cadre de ma semaine de cours d'**initiation à la méthodologie DevOps / CI/CD**.

## Fonctionnalités
Cette API dispose de plusieurs endpoints permettant de manipuler des **tâches** :

* [x] `POST /tasks` → Créer une tâche
* [x] `GET /tasks` → Récupérer toutes les tâches
* [x] `GET /tasks/:id` → Récupérer une tâche spécifique
* [x] `GET /tasks/completed` → Récupérer uniquement les tâches terminées (`state: true`)
* [x] `PUT /tasks/:id/complete` → Inverser l'état (`state`) d'une tâche
* [x] `DELETE /tasks/:id` → Supprimer une tâche

## Sauvegarde des données
Toutes les données sont stockées dans une base **MongoDB (NoSQL)**.

### Exemple de structure JSON :
```json
{
  "description": "Nouvelle tâche",
  "state": false
}
```

* Le champ `state` indique si la tâche est terminée (`true`) ou à faire (`false`).
* Un identifiant unique `_id` est automatiquement généré.

## Utilisation
Le projet fonctionne aussi bien **en local** que **déployé en ligne**.

### En local
#### Prérequis :
* Docker installé
* Cloner ce repo
* Se placer dans le dossier cloné via terminal

#### Commandes :
```bash
docker compose build
docker compose up
```
Vous pouvez ensuite interagir avec l'API via `http://localhost:3000/tasks`.

#### Visualisation de la base de données :
* Installez **MongoDB Compass**
* Connectez-vous à `mongodb://localhost:27017`
<img width="172" height="144" alt="Mongo Compass" src="https://github.com/user-attachments/assets/d30ebb04-2dba-460e-bca6-b03160d5a586"/>

### En ligne
L'API est également déployée sur Render :
`https://to-do-list-docker-mwrg.onrender.com`
Ajoutez simplement la route souhaitée à l'URL ci-dessus pour tester les fonctionnalités.

## Structure & outils
* Gestion de projet par tickets :
  [https://github.com/users/Koruji/projects/2/views/1](https://github.com/users/Koruji/projects/2/views/1)

* Workflows GitHub Actions :

  * Tests unitaires et d'intégration
  * Build & push d'image Docker
  * Évaluation de couverture (`coverage`) dans les logs de test

<img width="384" height="172" alt="Coverage Screenshot" src="https://github.com/user-attachments/assets/54ac96b9-0808-4e28-a46a-edb9e2e61d75" />

* Linting (ESLint & Prettier) :

  * Lancement local via `npm run lint`
  * Vérifie indentation, espaces, lignes vides, et variables non utilisées

#### Author : COTTIN Jade promo BD 25.2
