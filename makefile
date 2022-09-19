include tools/docker-image-name

dev-env:
	@cp tools/.prettierrc.json .prettierrc.json

build:
	@docker build -t $(NPM_IMAGE_NAME) -f docker/npm/Dockerfile .
	@docker build -t $(PROJECT_IMAGE_NAME) -f docker/application/Dockerfile .

install: dev-env
	@bin/npm i
	@bin/npm run font:build

start:
	@bin/application

test:
	@bin/npm test
