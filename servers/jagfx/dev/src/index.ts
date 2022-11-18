import fastify from 'fastify';

// https://www.fastify.io/docs/latest/Reference/TypeScript/

const server = fastify();

server.get('/ping', async (request, reply) => {
  return 'pong +66';
});

server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
