# Docker-apache-setup
Docker setup for task-tracker in progress. Will create containers for web application with simple database.

## Used images:
  - phpadmin
  - mariadb
  - php-apache

## Running app
1. Install docker and docker-compose.
2. Run docker compose - will pull images for you and run server and database.  
    - in docker_app directory run command: `docker-compose up`
3. App
   - server with application is running on port 8080 (type `localhost:8080` to webbrowser)  
   - phpadmin linked to database is running on port 8000
      -username: Korbi
      -password: wyBCewKk28kammg
   - database running on port 3306

## Task-tracker
  - App is old and in middle of futher development. First thing you will see after running is *The requested URL was not found on this server*, thats Okey :), just select Moje Filtre from top menu and you can see part of tasktracker running.
  - For futher development you can access scripts in directory: *docker_app/service_apache/App/_var_www_html*.
    - changes in scripts are applied without need to rebuild the images.  
## Running diferent app on server
  - Put your project with index.php to directory: *docker_app/service_apache/App/_var_www_html*.
  - Put your database script named ulohy.php to directory: *docker_app/service_apache/App/_var_www_html*.

