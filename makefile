env:
	@cp tools/.prettierrc.json .prettierrc.json
	@cp tools/tsconfig.json tsconfig.json
	@cp tools/.viterc.ts vite.config.ts
	@cp tools/.eslintignore .eslintignore
	@cp tools/.prettierignore .prettierignore
	@sed -i '/baseUrl/d' tsconfig.json
	@sed -i 's/\.\.\/src/\.\/src/g' vite.config.ts
	@sed -i 's/\.\.\/lib\/jagfx\/core\/src/\.\/lib\/jagfx\/core\/src/g' vite.config.ts

install: env
	@npm i
	@npm run font:build

start:
	@npm run dashboard:dev

test:
	@npm test

ci:
	@npm run ci

#server\:dev\:build:
#	@npm run build -w servers/jagfx/dev
#
#server\:dev\:watch:
#	@npm run watch -w servers/jagfx/dev
#
#server\:dev\:start:
#	@npm start -w servers/jagfx/dev