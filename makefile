include tools/docker-image-name

dev-env:
	@cp tools/.prettierrc.json .prettierrc.json
	@cp tools/tsconfig.json tsconfig.json
	@cp tools/tsconfig.json lib/tsconfig.json
	@cp tools/.viterc.ts vite.config.ts
	@sed -i '/baseUrl/d' tsconfig.json
	@sed -i '/baseUrl/d' lib/tsconfig.json
	@sed -i 's/\.\.\/src/\.\/src/g' vite.config.ts

install: dev-env
	@bin/node npm i
	@bin/node npm run font:build

build: install
	@docker build -t $(NPM_IMAGE_NAME) -f docker/npm/Dockerfile .

start:
	@bin/node npm run dashboard:dev

test:
	@bin/node npm test

ci:
	@bin/node npm run ci
