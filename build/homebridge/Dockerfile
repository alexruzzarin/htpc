FROM node:latest
MAINTAINER Alex Ruzzarin <alex@ruzzarin.net>

RUN apt-get update; \
    apt-get install -y --no-install-recommends libnss-mdns libavahi-compat-libdnssd-dev; \
    yarn global add node-gyp && \
    yarn global add homebridge

USER root

ADD image/run.sh /root/run.sh
VOLUME /root/.homebridge
VOLUME /var/run/dbus

EXPOSE 5353 5353/udp 51826 51828
CMD ["/root/run.sh"]