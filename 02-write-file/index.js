const fs = require('fs');
const path = require('path');
const Emitter = require('events');
const readline = require("readline");
const { text } = require('stream/consumers');
const { test } = require('node:test');
const emitter = new Emitter();


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const stream = fs.createWriteStream(path.join(__dirname , 'text2.txt') , );
rl.question('What text do you want to append ?' + '\n', (text) => {
    if(text.toString().trim() === 'exit'){
       handler();
    }
    stream.write(text)
    process.on('exit' , handler);
});

function handler () {
    console.log('GoodBye!');
    process.exit();
}


