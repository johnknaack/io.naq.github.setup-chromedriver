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

if ! [ -x "$(command -v lsof)" ]; then
  apt-get update
  apt-get install lsof
else
  echo "lsof is already installed"
fi
