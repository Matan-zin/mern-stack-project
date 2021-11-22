// import * as util from 'util';
import restify from 'restify-clients';
import program from 'commander';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
let client_host;
let client_version = '*';
let client_port;
let client_protocol;

const hashpass = async (password) => {
    const salt   = await bcrypt.genSalt(SALT_ROUNDS);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

const client = (program) => {
    if (typeof process.env.PORT === 'string') client_port = Number.parseInt(process.env.PORT);
    if (typeof program.port     === 'string') client_port = Number.parseInt(program.port);
    if (typeof program.host     === 'string') client_host = program.host;
    if (typeof program.url      === 'string') {
        let purl = new URL(program.url);
        if (purl.host     && purl.host !== '')     client_host = purl.host;
        if (purl.port     && purl.port !== '')     client_port = purl.port;
        if (purl.protocol && purl.protocol !== '') client_protocol = purl.protocol;
    }

    let connect_url = new URL('http://localhost:5050');
    if (client_protocol) connect_url.protocol = client_protocol;
    if (client_host)     connect_url.host = client_host;
    if (client_port)     connect_url.port = client_port;

    let client = restify.createJsonClient({
        url: connect_url.href,
        version: client_version
    });
    return client;
}

program
    .option('-p, --port <port>', 'Port number for user service')
    .option('-h, --host <host>', 'Host number for user service')
    .option('-u, --url <url>', 'Connection URL if using a remote service');

program
    .command('add')
    .description('Add a new user to the server')
    .option('--id <id>', 'id')
    .option('--username <username', 'User Name')
    .option('--password <password>', 'Password')
    .action(async (cmd_opt) => {
        const toadd = {
            id: cmd_opt.id,
            username: cmd_opt.username,
            password: await hashpass(cmd_opt.password)

        }
        client(program).post(`/auth`, toadd,
        (err, req, res, obj) => {
            if (err) console.error(err, err.stack);
            else console.log(JSON.stringify(obj));
        });
    });

program
    .command('find')
    .description('Find a user on the server by id')
    .option('--id <id>')
    .action(async (cmd_opt) => {
        client(program).get(`/auth/${cmd_opt.id}`, (err, req, res, obj) => {
            if(err) console.error(err);
            else console.log(JSON.stringify(obj));
        });
    });
    


program
    .command('update')
    .description('Update a user on the server')
    .option('--id <id>')
    .option('--username <username>')
    .option('--password <password>')
    .action(async (cmd_opt) => {
        const user = {
            id: cmd_opt.id,
            username: cmd_opt.username,
            password: await hashpass(cmd_opt.password)
        }
        client(program).put(`/auth`, user,
        (err, req, res, obj) => {
            if(err) console.error(err);
            else console.log(JSON.stringify(obj));
        })
    });

program
    .command('destroy')
    .description('Destroy a user on the server by id')
    .option('--id <id>', 'ID number')
    .action(async (cmd_opt) => {
        client(program).del(`/auth/${cmd_opt.id}`,
        (err, req, res, obj) => {
            if(err) console.error(err);
            else console.log(JSON.stringify(obj));
        });
    });

program
    .command('check-password')
    .description('Check if user password are valid')
    .option('--username <username>')
    .option('--password <password>')
    .action(async (cmd_opt) => {
        const user = {
            username: cmd_opt.username,
            password: cmd_opt.password
        }
        client(program).post(`/auth/check-password`, user,
        (err, req, res, obj) => {
            if(err) console.error(err);
            else console.log(JSON.stringify(obj));
        });
    });


program
    .command('list')
    .description('List all users inside the server')
    .action(async () => {
        client(program).get(`/auth`, (err, req, res, obj) => {
            if(err) console.error(err)
            else console.log(JSON.stringify(obj))
        });
    });


program.parse(process.argv);