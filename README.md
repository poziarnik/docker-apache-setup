# docker-apache-setup
Docker setup for task-tracker in progress. Will create containers for web application with simple database.

used images:
  -phpadmin
  -mariadb
  -php-apache

## running app
1. install docker and docker-compose
2. run docker compose - will pull images for you and run server and database  
    -in docker_app directory run command: `docker-compose up` 
3. - server with application is running on port 8080 (type `localhost:8080` to webbrowser)  
   - phpadmin linked to database is running on port 8000
      -username: Korbi
      -password: wyBCewKk28kammg
   - database running on port 3306

## task-tracker
  - app is old and in middle of futher development. First thing you will see after running is *The requested URL was not found on this server*, thats Okey :), just select Moje Filtre from top menu and you can see part of tasktracker running.
  - for futher development you can access scripts in directory: *docker_app/service_apache/App/_var_www_html*
    - changes in scripts are applied without need to rebuild the images.  
## running diferent app on server
  - put your project with index.php to directory: *docker_app/service_apache/App/_var_www_html*
  - put your database script named ulohy.php to directory: *docker_app/service_apache/App/_var_www_html*

