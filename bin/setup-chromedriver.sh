#!/bin/bash

set -eo pipefail

# Skip if chromedriver is already installed
# module_name="chromedriver"
# if npm list --depth 1 --parseable=true "$module_name" > /dev/null 2>&1; then
  # echo "$module_name is already installed. Exiting script."
  # exit 0
# fi

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
  CHROMEAPP=$(which google-chrome) || CHROMEAPP=$(which chromium-browser) || CHROMEAPP=$(which chrome) || CHROMEAPP=$(which chromium) || CHROMEAPP=$(which google-chrome-stable) || CHROMEAPP=$(which chromium-browser-stable) || CHROMEAPP=$(which chrome-stable) || CHROMEAPP=$(which chromium-stable)
  CHROME_VERSION=$("$CHROMEAPP" --version | cut -f 3 -d ' ' | cut -d '.' -f 1)
  VERSION=$(curl --location --fail --retry 10 http://chromedriver.storage.googleapis.com/LATEST_RELEASE_${CHROME_VERSION})
  echo "Installing chromedriver version $VERSION for Chrome version $CHROME_VERSION"
  wget -c -nc --retry-connrefused --tries=0 https://chromedriver.storage.googleapis.com/${VERSION}/chromedriver_${ARCH}.zip
  unzip -o -q chromedriver_${ARCH}.zip
  sudo mv chromedriver /usr/local/bin/chromedriver
  rm chromedriver_${ARCH}.zip
  # npm install chromedriver --detect_chromedriver_version
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
