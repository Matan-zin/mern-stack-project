import fs from 'fs';

(() => {
    fs.writeFile('./users-fs/users-detail.json', 
                  JSON.stringify([{"id":process.argv[2],"admin": true, "username":process.argv[3]}]),
                  (err) => console.log(err));
    fs.writeFile('./users-fs/permissions.json',
                  JSON.stringify([{"id":process.argv[2],"admin":true}]),
                  (err) => console.log(err));
})();