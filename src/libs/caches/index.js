const fs = require('fs');
const path = require('path');

function set(key, value) {
    let cached = `${fs.readFileSync(path.join(__dirname, "log.md"))}`;
    if(cached.includes(key)) {
        const index = cached.indexOf(key);
        let i = index;
        let count = 0;
        while(cached[i] !== '|') {
            count++;
            i++;
        }
        const pattern = cached.substr(index, count+1);
        cached = cached.split(pattern).join(`${key}:${value}|`);
    } else {
        cached += `${key}:${value}|`;
    }
    fs.writeFileSync(path.join(__dirname, "log.md"), cached);
}

function get(key){
    let cached = `${fs.readFileSync(path.join(__dirname, "log.md"))}`;
    if(!cached.includes(key)) {
        return null;
    }
    const index = cached.indexOf(key);
        let i = index;
        let count = 0;
        while(cached[i] !== '|') {
            count++;
            i++;
        }
    return cached.substr(index, count+1).split(`${key}:`)[1].split("|")[0];
}

module.exports = {
    set,
    get
}