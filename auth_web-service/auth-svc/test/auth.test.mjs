/**
 * auth.test:
 * Test the integration between the command line program (cli.mjs) and authentication service (app.mjs)
 * 
 * Note!: 
 *  - The test are based on the output from stdout so don't add output commands to the console
 *  
 * To run this test run: (TODO: simplified the process)
 * 
 *  [->]$ sudo systemctl start docker && sudo docker build -t auth-db-im ../../auth-db/ && sudo docker run --name auth-db -p 3306:3306 -d auth-db-im &&
 *  [->]$ sudo docker logs auth-db // see when connection is ready then continue
 *  [->]$ npm start                // one terminal process
 *  [->]$ run test                 // different terminal process
 */
import shell from 'shelljs';
import assert from 'assert';
import { v4 as uuid } from 'uuid';

// peedbacks emojys
const pass   = '\u2705';
const unpass = '\u274c';

const _id = uuid();
const _username = 'mat';
const _password = '1234';
const _new_username = 'zi';
const _new_password = '12345';


(async () => {

    await (() => {
        return new Promise((resolve) => {
            shell.exec(`node cli.mjs add --id ${_id} --username ${_username} --password ${_password}`,
            (code, stdout, stderr) => {
            const description = ' Should add a new user to auth database.' // <=
               try {
                    const { id, username } = JSON.parse(stdout);
                    assert(id === _id);
                    assert(username === _username);

                    console.log(pass + description);
                    resolve(true)
               } catch(err) {
                    console.log(unpass + description);
                    resolve(err);
               }
            })
        })
    })();


    await (() => {
        return new Promise((resolve) => {
            shell.exec(`node cli.mjs find --id ${_id}`,
            (code, stdout, stderr) => {
            const description = ' Should find a user by a given id number.'
               try {
                    const { id, username } = JSON.parse(stdout);
                    assert(id === _id);
                    assert(username === _username);

                    console.log(pass + description);
                    resolve(true)
               } catch(err) {
                    console.log(unpass + description);
                    resolve(err);
               }
            })
        })
    })();


    await (() => {
        return new Promise((resolve) => {
            shell.exec(`node cli.mjs update --id ${_id} --username ${_new_username} --password ${_new_password}`,
            (code, stdout, stderr) => {
            const description = ' Should update user details in auth database.' 
               try {
                   const { id, username } = JSON.parse(stdout);
                    assert(id === _id);
                    assert(username === _new_username);

                    console.log(pass + description);
                    resolve(true)
               } catch(err) {
                    console.log(unpass + description);
                    resolve(err);
               }
            })
        })
    })();

    await (() => {
        return new Promise((resolve) => {
            shell.exec(`node cli.mjs list`,
            (code, stdout, stderr) => {
            const description = ' Should list all users from auth database.' 
               try {
                    const userslist = JSON.parse(stdout);
                    assert(userslist instanceof Array);
                    assert(userslist.length > 0);

                    console.log(pass + description);
                    resolve(true)
               } catch(err) {
                    console.log(unpass + description);
                    resolve(err);
               }
            })
        })
    })();

    await (() => {
        return new Promise((resolve, reject) => {
            shell.exec(`node cli.mjs check-password --username ${_new_username} --password ${_new_password}`,
            (code, stdout, stderr) => {
            const description = ' Should check that the user password are correct.' 
               try {
                    const msg = JSON.parse(stdout);
                    assert(msg.check === true);
                    assert(msg.username === _new_username);
                    
                    console.log(pass + description);
                    resolve(true)
               } catch(err) {
                    console.log(unpass + description);
                    reject(err);
               }
            })
        })
    })();

    await (() => {
        return new Promise((resolve) => {
            shell.exec(`node cli.mjs destroy --id ${_id}`,
            (code, stdout, stderr) => {
            const description = ' Should destroy a user by a given id number.' 
               try {
                    const res = JSON.parse(stdout);
                    assert(typeof res === 'object');
                    assert('id' in res === false);

                    console.log(pass + description);
                    resolve(true)
               } catch(err) {
                    console.log(unpass + description);
                    resolve(err);
               }
            })
        })
    })()

})();
