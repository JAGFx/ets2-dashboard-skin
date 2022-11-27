import fastify from 'fastify';

import configApplication from 'ets2-dashboard-server/src/config/config.json' assert { type: "json" };
import { toUserPreferencesCollection } from 'ets2-dashboard-server/src/user-preference/transformer.js';

// https://www.fastify.io/docs/latest/Reference/TypeScript/

const server = fastify();

server.get('/ping', async (request, reply) => {
  return 'pong +66';
});

server.get('/user-preferences', async (request, reply) => {
  console.log( 'Plop' );
  return toUserPreferencesCollection(configApplication);
});

server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
