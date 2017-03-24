FROM linuxserver/plex
MAINTAINER Alex Ruzzarin <alex@ruzzarin.net>

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
    apt-get install -y --no-install-recommends build-essential python libavahi-compat-libdnssd-dev nodejs

ENV YARN_VERSION 0.21.3
RUN set -ex \
  && for key in \
    6A010C5166006599AA17F08146C2130DFD2497F5 \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done \
  && curl -fSL -o yarn.js "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-legacy-$YARN_VERSION.js" \
  && curl -fSL -o yarn.js.asc "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-legacy-$YARN_VERSION.js.asc" \
  && gpg --batch --verify yarn.js.asc yarn.js \
  && rm yarn.js.asc \
  && mv yarn.js /usr/local/bin/yarn \
  && chmod +x /usr/local/bin/yarn

RUN yarn global add node-gyp && \
    yarn global add homebridge


# add local files
COPY root/ /

# ports and volumes
EXPOSE 51826 51828
VOLUME /homebridge-config