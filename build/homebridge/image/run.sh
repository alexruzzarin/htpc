#!/bin/bash

sed -i 's/#enable-dbus=yes/enable-dbus=no/g' /etc/avahi/avahi-daemon.conf

dbus-daemon --system
avahi-daemon -D

install_file="/root/.homebridge/install.sh"
if [ -f "$install_file" ]
then
    echo "Executing $install_file."

    sh $install_file
else
    echo "$install_file not found."
fi

homebridge