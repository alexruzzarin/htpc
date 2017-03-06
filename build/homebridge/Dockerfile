FROM node:7
MAINTAINER Alex Ruzzarin <alex@ruzzarin.net>

##################################################
# Install tools                                  #
##################################################

RUN apt-get update && \
    apt-get install -y \
    libavahi-compat-libdnssd-dev

##################################################
# Install homebridge                             #
##################################################

RUN npm install -g homebridge \
    homebridge-people \
    homebridge-meteostation \
    homebridge-yamaha


##################################################
# Start                                          #
##################################################

USER root
RUN mkdir -p /var/run/dbus
RUN mkdir -p /root/.homebridge

ADD image/config.json /root/.homebridge/config.json
ADD image/run.sh /root/run.sh

EXPOSE 5353/udp 51826 51828
CMD ["/root/run.sh"]