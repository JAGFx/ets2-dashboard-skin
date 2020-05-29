import * as events from './events/events';
import server      from './helpers/server.helpers';

server();

events.game();
events.job();
events.navigation();
events.trailers();
events.truck();
