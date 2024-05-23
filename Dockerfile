# syntax=docker/dockerfile:1
FROM --platform=$BUILDPLATFORM node:18.9-alpine3.15 AS client-builder
WORKDIR /ui
# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
# install
COPY ui /ui
RUN npm run build

FROM alpine
LABEL org.opencontainers.image.title="OVHcloud images" \
    org.opencontainers.image.description="Manage images created and maintaned by OVHcloud." \
    org.opencontainers.image.vendor="Scraly" \
    com.docker.desktop.extension.api.version="0.3.3" \
    com.docker.extension.screenshots="[ \
    {\"alt\": \"OVHcloud images\", \"url\": \"https://raw.githubusercontent.com/scraly/ovhimages-extension/main/assets/ovhimages-extension.png\"} \
    ]" \
    com.docker.extension.detailed-description="This extension allows you to list and pull images created and maintaned by OVHcloud from Docker Hub and OVHcloud Managed Private Registries." \
    com.docker.extension.publisher-url="http://scraly.com/" \
    com.docker.extension.additional-urls="" \
    com.docker.extension.changelog="<ul>\
    <li>First version.</li> \
    </ul>" \
    com.docker.desktop.extension.icon="https://raw.githubusercontent.com/scraly/ovhimages-extension/main/ovhcloud.svg" \
    com.docker.extension.categories="image-registry"

COPY metadata.json .
COPY ovhcloud.svg .
COPY --from=client-builder /ui/build ui
