#!/bin/bash

sed -i 's/rlimit-nproc=3/#rlimit-nproc=3/' /etc/avahi/avahi-daemon.conf

install_file="/root/.homebridge/install.sh"
plugin_folder="/root/.homebridge/plugins"

if [ -f "$install_file" ]
then
    echo "Executing $install_file."

    sh $install_file
else
    echo "$install_file not found."
fi

echo "Installing plugins ($plugin_folder) modules"
find ${plugin_folder}/* -name "package.json" -maxdepth 1 -execdir yarn \;

echo "Starting homebridge"
homebridge -D -P $plugin_folder