#!/bin/bash

MODULE="$1"
NODE_MODULES="./node_modules"

cd ${NODE_MODULES} && rm -rf ${MODULE} && ln -s ../${MODULE} && cd ${MODULE} && npm install