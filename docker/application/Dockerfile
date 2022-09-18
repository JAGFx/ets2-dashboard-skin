FROM unicorn/ets2-dashboard-skin/packager:latest

WORKDIR /usr/app
USER root
COPY . .

USER node
CMD ["npm","run", "dashboard:dev"]