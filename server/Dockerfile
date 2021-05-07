FROM node:14.16.1-buster-slim

EXPOSE 4500
USER node

COPY --chown=node:node package.json /opt/server/package.json
COPY --chown=node:node tsconfig-run.json /opt/server/tsconfig-run.json
COPY --chown=node:node node_modules/ /opt/server/node_modules
COPY --chown=node:node scripts/ /opt/server/scripts
COPY --chown=node:node dist/ /opt/server/dist/

WORKDIR /opt/server

ENV NODE_ENV production
ENV DEBUG "server*"
CMD ["./scripts/run-built.sh", "dist/server/src/index"]
