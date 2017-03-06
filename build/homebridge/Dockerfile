FROM node:alpine
MAINTAINER Alex Ruzzarin <alex@ruzzarin.net>

RUN apk add --no-cache \
        make gcc g++ python avahi-dev

RUN yarn global add homebridge

USER root
RUN mkdir -p /var/run/dbus

ADD image/run.sh /root/run.sh

EXPOSE 5353/udp 51826 51828
VOLUME /root/.homebridge

CMD ["/root/run.sh"]