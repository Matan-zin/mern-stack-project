/**
 * To run those tests, you need to run a container instance
 * on background and expose port 27017.
 * then run $ npm run test
 */

import { server } from "../app.mjs";

import { movie_test }        from "./movie.test.mjs";
import { member_test }       from "./member.test.mjs";
import { subscription_test } from "./subscription.test.mjs";

movie_test(server);
member_test(server);
subscription_test(server);