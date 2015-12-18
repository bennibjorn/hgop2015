#!/bin/bash

# ssh into remote server and pull
# first parameter = user@ip_address of remote ssh server

ssh $1 'bash -s ' < dockerRestartServer.sh
