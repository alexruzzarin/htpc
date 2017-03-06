FROM node:latest
MAINTAINER Alex Ruzzarin <alex@ruzzarin.net>

RUN mkdir -p /var/run/dbus && \
    apt-get update; \
    apt-get install -y --no-install-recommends libnss-mdns avahi-discover libavahi-compat-libdnssd-dev; \
    yarn global add node-gyp && \
    yarn global add homebridge

USER root

ADD image/run.sh /root/run.sh
VOLUME /root/.homebridge

EXPOSE 5353/udp 51826 51828
CMD ["/root/run.sh"]