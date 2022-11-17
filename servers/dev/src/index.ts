import fastify from 'fastify';

import { port } from '@/test/plop';

// https://www.fastify.io/docs/latest/Reference/TypeScript/

const server = fastify();

server.get('/ping', async (request, reply) => {
  return 'pong';
});

server.listen({ port: port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
