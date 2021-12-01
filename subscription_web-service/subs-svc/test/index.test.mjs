/**
 * To run those tests, 
 * you need to run a container database instance from subs-db
 * 
 * $ docker build -t subs-db-im /path/to/subs-db/
 * $ docker run --name subs-db -p 27017:27017 -d subs-db-im
 * 
 * then run 
 * 
 * $ npm run test
 */

import { server } from "../app.mjs";

import { movie_test }        from "./movie.test.mjs";
import { member_test }       from "./member.test.mjs";
import { subscription_test } from "./subscription.test.mjs";

movie_test(server);
member_test(server);
subscription_test(server);