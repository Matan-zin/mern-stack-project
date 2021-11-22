import fs from 'fs';
import { Strategy} from 'passport-jwt';
import { approotdir } from '../approotdir.mjs';
import { details as model } from '../models/details.mjs';


const path_to_key = approotdir + '/id_rsa_pub.pem';

const PUB_KEY = fs.readFileSync(path_to_key);

const cookieExtractor = function (req) {
    let token = null;
    if (req && req.signedCookies && req.signedCookies.jwt) {
        token = req.signedCookies['jwt'];
    }
    return token;
};

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

export const configPassport = (passport) => { 
passport.use(new Strategy( options,
    async(jwt_payload, done) => {
        try {
            const res = await model.get(jwt_payload.sub);
            if(Object.keys(res).length > 0) { 
                done(null, { id: res.id, username: res.username });
            } else { 
                done(null, false); 
            }   
        } catch(err) { done(err) }
    }
))}