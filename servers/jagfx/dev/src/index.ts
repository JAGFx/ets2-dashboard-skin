import { UserPreference } from 'ets2-dashboard-core/src/configuration/user-preference/user-preference.type.js';

import configApplication               from 'ets2-dashboard-server/src/config/config.json' assert { type: 'json' };
import { toUserPreferencesCollection } from 'ets2-dashboard-server/src/user-preference/transformer.js';
import fastify                         from 'fastify';

// https://www.fastify.io/docs/latest/Reference/TypeScript/

const server = fastify();

server.get('/ping', async () => {
  return 'pong +66';
});

server.get('/user-preferences', async (): Promise<UserPreference[]> => {
  return toUserPreferencesCollection(configApplication).toJson();
});

server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
