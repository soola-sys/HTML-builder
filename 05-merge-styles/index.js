const path = require('path');
const fsp = require('fs').promises;
const destPath = path.join(__dirname, 'project-dist' , 'bundle.css');
const currPath = path.join(__dirname,'styles');

const newArr = []

async function readStyles(){
    const fileList = await fsp.readdir(currPath);
    for(const file of fileList){
        let stats = await fsp.stat(currPath , file);
        if(stats.isDirectory() && path.extname(file) == '.css'){
            console.log(file);
            const fileContent = await fsp.readFile(path.join(currPath , file));
            await fsp.appendFile(destPath , fileContent);
            // console.log(fileContent);
        }
    }
}

const execute = async() => {
    try {
        await readStyles();
    } catch(err) {
        console.log(err);
    } finally {

    }
}
execute()