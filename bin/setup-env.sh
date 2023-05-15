#!/bin/bash

set -eo pipefail

ARCH="Not Set"
if [[ "$1" =~ ^ubuntu-* ]]; then
  ARCH="linux64"
elif [[ "$1" =~ ^macos-* ]]; then
  ARCH="mac64"
elif [[ "$1" =~ ^windows-* ]]; then
  ARCH="win64"
fi

# if [ -d "output" ]; then
  # echo "Deleting existing output folder"
  # rm -rf output
# fi

if [ -d "node_modules" ]; then
  echo "Deleting node_modules folder"
  rm -rf node_modules
fi

# Install dependencies
if [ -e "package.json" ]; then
  echo "Running npm install"
  npm i
fi
