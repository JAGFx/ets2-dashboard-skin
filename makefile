dev-env:
	@cp tools/.prettierrc.json .prettierrc.json
	@cp tools/tsconfig.json tsconfig.json
	@cp tools/.viterc.ts vite.config.ts
	@cp tools/.eslintignore .eslintignore
	@cp tools/.prettierignore .prettierignore
	@sed -i '/baseUrl/d' tsconfig.json
	@sed -i 's/\.\.\/src/\.\/src/g' vite.config.ts
	@sed -i 's/\.\.\/lib\/jagfx\/core\/src/\.\/lib\/jagfx\/core\/src/g' vite.config.ts
	@sed -i 's/\.\.\/lib\/jagfx\/server\/src/\.\/lib\/jagfx\/server\/src/g' vite.config.ts

install: dev-env
	@bin/node npm i
	@bin/node npm run font:build

build:
	@docker build -t unicorn/ets2-dashboard-skin/node:latest -f docker/node/Dockerfile .

start:
	@bin/app npm run dashboard:dev

test:
	@bin/node npm test

ci:
	@bin/node npm run ci

server\:dev\:build:
	@bin/node npm run build -w servers/jagfx/dev

server\:dev\:start: server\:dev\:build
	@bin/node npm run start -w servers/jagfx/dev