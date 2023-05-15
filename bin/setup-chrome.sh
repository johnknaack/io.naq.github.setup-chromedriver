#!/bin/bash

set -eo pipefail

if which google-chrome >/dev/null; then
  echo "Google Chrome is already installed. Exiting script."
  exit 0
fi

ARCH="Not Set"
if [[ "$1" =~ ^ubuntu-* ]]; then
  ARCH="linux64"
elif [[ "$1" =~ ^macos-* ]]; then
  ARCH="mac64"
elif [[ "$1" =~ ^windows-* ]]; then
  ARCH="win64"
fi

if [ "$ARCH" == "linux64" ]; then
  echo "Building Linux 64-bit"
  apt-get update
  wget "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb" -P /tmp
  apt-get install -y "/tmp/google-chrome-stable_current_amd64.deb" -f
elif [ "$ARCH" == "mac64" ]; then
  echo "Building Mac 64-bit"
  echo "TODO - implement $ARCH instller in $(basename $0)"
elif [ "$ARCH" == "win64" ]; then
  echo "Building Windows 64-bit"
  echo "TODO - implement $ARCH instller in $(basename $0)"
else
  echo "Unknown architecture: $ARCH"
  exit 1
fi
