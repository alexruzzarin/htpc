FROM linuxserver/plex
MAINTAINER Alex Ruzzarin <alex@ruzzarin.net>

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
    apt-get install -y --no-install-recommends build-essential python libavahi-compat-libdnssd-dev nodejs

RUN npm i -g yarn

RUN yarn global add node-gyp && \
    yarn global add homebridge


# add local files
COPY root/ /

# ports and volumes
EXPOSE 51826 51828
VOLUME /homebridge-config