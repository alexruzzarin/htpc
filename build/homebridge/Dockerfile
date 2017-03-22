FROM node:latest
MAINTAINER Alex Ruzzarin <alex@ruzzarin.net>

RUN apt-get update; \
    apt-get install -y --no-install-recommends libnss-mdns libavahi-compat-libdnssd-dev avahi-daemon dbus; \
    yarn global add node-gyp && \
    yarn global add homebridge && \
    mkdir -p /var/run/dbus

COPY image/avahi-daemon.conf /etc/avahi/avahi-daemon.conf

USER root

RUN mkdir -p /var/run/dbus

ADD image/run.sh /root/run.sh

VOLUME /root/.homebridge

EXPOSE 51826 51828
CMD ["/root/run.sh"]