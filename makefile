include tools/docker-image-name

dev-env:
	@cp tools/.prettierrc.json .prettierrc.json
	@cp tools/tsconfig.json tsconfig.json
	@cp tools/.viterc.ts vite.config.ts
	@sed -i '/baseUrl/d' tsconfig.json
	@sed -i 's/\.\.\/src/\.\/src/g' vite.config.ts

install: dev-env
	@bin/npm i
	@bin/npm run font:build

build: install
	@docker build -t $(NPM_IMAGE_NAME) -f docker/npm/Dockerfile .
	@docker build -t $(PROJECT_IMAGE_NAME) -f docker/application/Dockerfile .

start: build
	@bin/application

test: install
	@bin/npm test
