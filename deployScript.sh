#!/bin/bash

# ssh into remote server and pull
# first parameter = ip address of remote ssh server

ssh $1 'docker kill $(docker ps -a -q) &&
	docker rm $(docker ps -a -q) &&
	docker pull bennibjorn/tictactoe &&
	docker run -p 8080:8080 -d -e "NODE_ENV=production" bennibjorn/tictactoe' 
