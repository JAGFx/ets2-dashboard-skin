dev-env:
	@cp tools/.prettierrc.json .prettierrc.json
	@cp tools/tsconfig.json tsconfig.json
	@cp tools/.viterc.ts vite.config.ts
	@cp tools/.eslintignore .eslintignore
	@cp tools/.prettierignore .prettierignore
	@sed -i '/baseUrl/d' tsconfig.json
	@sed -i 's/\.\.\/src/\.\/src/g' vite.config.ts
	@ln -s ${pwd}/bin servers/jagfx/dev/bin

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
