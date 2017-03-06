# HTPC
My HTPC docker-compose

## Folder Structure
```
.
├── data
│   ├── download
│   └── videos
│       ├── demo
│       ├── movies
│       ├── personal
│       ├── transcode
│       └── tv
├── docker
│   ├── config
│   │   ├── couchpotato
│   │   ├── deluge
│   │   ├── htpcmanager
│   │   ├── muximux
│   │   ├── plex
│   │   └── sonarr
│   └── docker-compose.yml
```

All the files and directories should be owned by the same user and group, and you need to add this user UID and this group GID to environment of docker services.
