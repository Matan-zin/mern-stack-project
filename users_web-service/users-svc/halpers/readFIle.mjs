import { promises as fs } from 'fs';

export const readFile = async (path) => {
    try {
        const data = await fs.readFile(path, 'utf-8');
        return (data.length > 0 ) ? JSON.parse(data) : [] ;
    } catch(err) { 
        // let the system create a file if dosent exist
        if(err.message.includes('no such file')) return [];
        throw err;
    }
};