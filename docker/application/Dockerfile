FROM unicorn/ets2-dashboard-skin/packager:latest

USER root
COPY . .
RUN npm i \
    && npm run font:build

USER node
CMD ["npm","run", "dashboard:dev"]