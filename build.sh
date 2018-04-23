#!/bin/bash

pushd ./sb-actuator-service && ./gradlew clean build && popd \
    && pushd test-load && npm install && popd \
    && docker-compose build --force
