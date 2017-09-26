FROM linuxserver/plex
MAINTAINER Alex Ruzzarin <alex@ruzzarin.net>

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y --no-install-recommends build-essential python libavahi-compat-libdnssd-dev iputils-ping nodejs

RUN npm install -g node-gyp --unsafe && \
    npm install -g homebridge --unsafe


# add local files
COPY root/ /

# ports and volumes
EXPOSE 51826 51828
VOLUME /homebridge-config
