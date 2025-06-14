Documentation Projet Docker


L'application est composée de trois services principaux, chacun conteneurisé via Docker et orchestré avec Docker Compose.

Service	Rôle	Port exposé
frontend	Interface React utilisateur	80
backend	API Express + Node.js	3000
db	PostgreSQL 15, stockage des données	5432
________________________________________
Le volume Docker db_data est utilisé pour assurer la persistance des données PostgreSQL même après arrêt du conteneur.
Dans le docker-compose.yml :
volumes:
  db_data:
Ce volume est monté dans /var/lib/postgresql/data.

Il en a un pour l’initialisation de la base de données
________________________________________
 Réseaux
Deux réseaux Docker sont définis pour isoler les communications :
Dans le docker-compose.yml :
networks:
  front_back_network:
  back_db_network:
•	front_back_network : communication entre le frontend et le backend
•	back_db_network : communication entre le backend et la base de données PostgreSQL
Chaque service est connecté uniquement aux réseaux dont il a besoin, pour plus de sécurité et une meilleure isolation.
________________________________________
Pour lancer les conteneur grâce au docker-compose.yml, j’exécute la commande :
docker-compose up -d –build
Pour tester la persistance, j’arrête les conteneurs sans les supprimer et sans supprimer les volumes avec cette commande :
docker-compose down
Je redemarre les conteneurs ensuite avec cette commande :
docker-compose up -d
Pour stopper et supprimer toute l’infrastructure docker, j’exécute cette commande :
docker-compose down --volumes 

