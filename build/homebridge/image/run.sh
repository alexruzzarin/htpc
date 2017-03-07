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

find ${plugin_folder}/* -name "package.json" -maxdepth 1 -execdir yarn \;

rm -f /var/run/dbus/pid /var/run/avahi-daemon/pid

dbus-daemon --system --nofork
avahi-daemon --no-chroot -D

# service dbus start
# service avahi-daemon start

homebridge -P $plugin_folder