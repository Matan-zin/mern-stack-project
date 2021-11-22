import { connectDB, findUser } from "./model/auth.mjs";
import shell from 'shelljs';

export const createAdmin = async () => {
    return new Promise(async (resolve, reject) => {
        await connectDB();
        const res = await findUser(process.env.ADMIN_ID);
        if(res) return resolve(true);

        shell.exec(`node cli.mjs add --id ${process.env.ADMIN_ID} --username ${process.env.ADMIN_NAME} --password ${process.env.ADMIN_PSW}`,
            (code, stdout, stderr) => {
                if(stderr) reject(stderr)
                resolve(stdout)
            })
    })
};