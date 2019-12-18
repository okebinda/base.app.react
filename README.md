# Base React Native Mobile App

This repository holds the source code for a simple mobile app written in JavaScript using React Native that connects to a REST API and can be used as the starter package for a new project. It also contains a virtual machine for local development.

This is a React Native application using React Native Elements (https://react-native-elements.github.io/react-native-elements/) for the interface. It can be adjusted to fit any REST API, but is made to work out-of-the-box with https://github.com/okebinda/base.api.python.

Local development is run on a local virtual machine managed by Vagrant. To install the virtual machine, make sure you have installed Vagrant (https://www.vagrantup.com/) and a virtual machine provider, such as VirtualBox (https://www.virtualbox.org/). You should also install the Vagrant plugin for forwarding file system events to the host (https://github.com/mhallin/vagrant-notify-forwarder).

## Manage Local Development Environment

### Provision Virtual Machine

Sets up the local development environment.

```ssh
> vagrant up
> vagrant ssh
$ cd /vagrant
$ ./scripts/build.sh
```

#### For iOS

```ssh
> cd {project directory}
> pod install
```

If you get an error like `xcrun: error: SDK "iphoneos" cannot be located` try:

```ssh
> sudo xcode-select --switch /Applications/Xcode.app
> pod install
```

### Start Virtual Machine

Starts the local development environment. This is a prerequisite for any following steps if the machine is not already booted.

```ssh
> vagrant up
```

### Stop Virtual Machine

Stops the local development environment. Run this command from the host (i.e. log out of any virtual machine SSH sessions).

```ssh
> vagrant halt
```

### Delete Virtual Machine

Deletes the local development environment. Run this command from the host (i.e. log out of any virtual machine SSH sessions).

```ssh
> vagrant destroy
```

Sometimes it is useful to completely remove all residual Vagrant files after destroying the box, in this case run the additional command:

```ssh
> rm -rf ./vagrant
```

## Manage the Application

### Run Interactive Development Shell

Runs the local Node.JS interactive development shell in the console.

```ssh
> vagrant ssh
$ cd /vagrant/application
$ npm start
```

Then build the application in Xcode or Android Studio.

#### Testing Android on Device

```ssh
$ adb devices
$ adb -s <DEVICE_ID> reverse tcp:8081 tcp:8081
```

### Run Unit Tests

There are currently no unit tests.

## Deployment

[@todo] Add deployment scripts.

## Screenshots

<img src="https://github.com/okebinda/base.app.react/blob/master/data/images/screenshots/ios/LoginScreen_1242x2688.png" width="300">
<img src="https://github.com/okebinda/base.app.react/blob/master/data/images/screenshots/ios/RegisterScreen_1242x2688.png" width="300">
<img src="https://github.com/okebinda/base.app.react/blob/master/data/images/screenshots/ios/DrawerNavigation_1242x2688.png" width="300">

## Repository Directory Structure

| Directory/File      | Purpose       |
| ------------------- | ------------- |
| /application        | Contains all files required for the application to run |
|  ├─/android         | Android specific build files |
|  ├─/ios             | iOS specific build files |
|  ├─/src             | Application source code |
|  ├─/index.js        | The application entry point |
|  └─/package.json    | The Node.JS manifest file for the project |
| /scripts            | Contains various scripts, such as the script to build the application for the first time (installs dependencies) |
| /data               | Contains the data used to populate the application for development and testing, such as data fixtures |
| /deploy             | Deployment scripts |
| /documentation      | Documentation files |
| /provision          | Provision scripts for local virtual machine and production servers |
| /tests              | Unit tests |
| README.md           | This file |
| Vagranfile          | Configuration file for Vagrant when provisioning local development virtual machine |
