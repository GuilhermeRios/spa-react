#!/usr/bin/env bash

while [[ "$(curl -s localhost:9000/api/system/status)" != *'"status":"UP"'* ]]; do 
  printf "Waiting for Sonar to be ready..\n"
  sleep 5;
done

printf "\n===============\n"
printf "Sonar is UP at localhost:9000"
printf "\n===============\n\n"

printf "Running 'mvn clean verify sonar:sonar' ...\n\n"

mvn clean verify sonar:sonar

while [[ "$(curl -s --data-urlencode "projectKey=$SONAR_PROJECT_ID" http://localhost:9000/api/qualitygates/project_status)" == *'"status":"NONE"'* ]] \
  || [[ "$(curl -s --data-urlencode "projectKey=$SONAR_PROJECT_ID" http://localhost:9000/api/qualitygates/project_status)" == *"not found"* ]]; do 
  printf "Waiting for results to be available in Sonar..\n"
  sleep 5;
done

SONAR_RESULT=$(curl -s --data-urlencode "projectKey=$SONAR_PROJECT_ID" http://localhost:9000/api/qualitygates/project_status)
PROJECT_STATUS=$(printf $SONAR_RESULT | jq '.projectStatus .status')

printf "\n===============\n"
printf "PROJECT STATUS = $PROJECT_STATUS\n\n"

printf "CONDITIONS"
printf "\n===============\n"

echo $SONAR_RESULT | jq '.projectStatus .conditions'

if [ $PROJECT_STATUS == "OK" ]
then
  exit 0
else
  exit 1
fi
