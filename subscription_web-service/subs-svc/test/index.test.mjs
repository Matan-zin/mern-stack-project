import { server } from "../app.mjs";

import { movie_test }        from "./movie.test.mjs";
import { member_test }       from "./member.test.mjs";
import { subscription_test } from "./subscription.test.mjs";

movie_test(server);
member_test(server);
subscription_test(server);