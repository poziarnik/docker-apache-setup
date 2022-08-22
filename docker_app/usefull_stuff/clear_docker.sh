#!/bin/bash
docker container rm $(docker container ps -a -q)
docker image rm $(docker image ls)
docker volume rm $(docker volume ls)

