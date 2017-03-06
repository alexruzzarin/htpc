FROM node:alpine
MAINTAINER Alex Ruzzarin <alex@ruzzarin.net>

RUN mkdir -p /var/run/dbus \
    && apk add --no-cache \
        make gcc g++ python avahi-dev dbus-dev \
    && yarn global add node-gyp \
    && yarn global add homebridge

USER root

ADD image/run.sh /root/run.sh
VOLUME /root/.homebridge

EXPOSE 5353/udp 51826 51828
CMD ["/root/run.sh"]