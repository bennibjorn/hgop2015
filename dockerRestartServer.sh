#!/bin/bash
docker kill ttt
docker rm ttt
if [[ $rc != 0 ]]
    then
    #echo Cannot remove container ttt
    docker pull bennibjorn/tictactoe
    docker run -p 80:8080 -d -e "NODE_ENV=production" --name="ttt" bennibjorn/tictactoe
    exit $rc
fi
docker pull bennibjorn/tictactoe
docker run -p 80:8080 -d -e "NODE_ENV=production" --name="ttt" bennibjorn/tictactoe
