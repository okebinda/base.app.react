# Base React Native App

## Prerequisites

* https://www.vagrantup.com/
* https://github.com/mhallin/vagrant-notify-forwarder

## Provision

* vagrant up
* vagrant ssh
* cd /vagrant
* ./build/build.sh

### For iOS

* cd {project directory}
* pod install

If you get an error like `xcrun: error: SDK "iphoneos" cannot be located` try:

* sudo xcode-select --switch /Applications/Xcode.app
* pod install

## Run Node/React Development Server

* cd /vagrant/application
* npx react-native start

## Test

### All Tests

* cd /vagrant/application
* npm test

### Unit Tests

* cd /vagrant/application
* npm run unit-tests

### Component Tests

* cd /vagrant/application
* npm run component-tests

## Deploy



## Testing Android on Device

adb devices
adb -s <DEVICE_ID> reverse tcp:8081 tcp:8081
