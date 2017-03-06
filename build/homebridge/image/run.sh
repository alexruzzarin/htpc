#!/bin/bash

sed -i "s/rlimit-nproc=3/#rlimit-nproc=3/" /etc/avahi/avahi-daemon.conf

dbus-daemon --system
avahi-daemon -D

service dbus start
service avahi-daemon start

install_file="/root/.homebridge/install.sh"
if [ -f "$install_file" ]
then
    echo "Executing $install_file."

    sh $install_file
else
    echo "$install_file not found."
fi

homebridge