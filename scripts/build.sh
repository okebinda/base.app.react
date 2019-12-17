#!/bin/bash

cd /home/vagrant/

# install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
. ~/.nvm/nvm.sh

# instanll NodeJS
nvm install 12.13.0

# # install the React Native CLI
# npm install -g react-native-cli

# install the React Dev Tools
npm install -g react-devtools

# # install project dependencies
# cd /vagrant/application
# npm install
# npm install --only=dev

# # for Android native linking
# npx jetify
