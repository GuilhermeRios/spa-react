#!/usr/bin/env bash

docker build -t sonarqube-aem -f sonar/Dockerfile .
docker run -it -d -p 9000:9000 sonarqube-aem
