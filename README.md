# docker-apache-setup
Docker setup for tasktracker in progress. Will create containers for web application with simple databse.

used images:
  phpadmin
  mariadb
  php-apache

##running app
1. insatll docker
2. run docker compose - will pull images for you and run server and database
3. - server with application is running on port 8080 (type localhost:8080 to webbrowser
   - phpadmin linked to database is running on port 8000
   - database running on port
   
##running diferent app on server
  - put your project with index.php to directory: docker_app/service_apache/App/_var_www_html
  - put your database script named ulohy.php to directory: docker_app/service_apache/App/_var_www_html
