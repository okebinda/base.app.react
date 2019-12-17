#!/bin/sh

############################
#
# BASE.APP.REACT.VM
#
#  Development Bootstrap
#
#  Ubuntu 18.04
#  https://www.ubuntu.com/
#
#  Packages:
#   vim tmux screen git zip
#   Java (openjdk)
#   Watchman
#
#  author: kevinc@signal33.co
#  date: November, 2019
#
############################


#################
#
# System Updates
#
#################

# get list of updates
apt-get update

# update all software
apt-get upgrade -y

# update ulimit
echo "
*       hard    nofile  4096
*       soft    nofile  4096
" > /etc/security/limits.conf


################
#
# Install Tools
#
################

apt-get install vim tmux screen git zip -y


################
#
# Install Java
#
################

apt-get install default-jre -y


###################
#
# Install Watchman
#
###################

apt-get install pkg-config
git clone https://github.com/facebook/watchman.git
cd watchman/
git checkout v4.9.0
apt-get install -y autoconf automake build-essential python-dev libssl-dev libtool pkg-config
./autogen.sh
./configure
make
make install


###################
#
# Update hosts file
#
###################

echo "
172.29.17.200 base.api.python.vm base.api.admin.python.vm
" >> /etc/hosts


###############
#
# VIM Settings
#
###############

su vagrant <<EOSU
echo 'syntax enable
set hidden
set history=100
set number
filetype plugin indent on
set tabstop=4
set shiftwidth=4
set expandtab' > ~/.vimrc
EOSU
