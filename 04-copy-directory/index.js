const path = require('path');
const fsp = require('fs').promises;
const destPath = path.join(__dirname,'files-copy');
const currPath = path.join(__dirname,'files');

async function copyFiles(){
   const fileList = await fsp.readdir(currPath);
   for(const file of fileList){
    const destinationPath = path.join(destPath, file);
    const currentPath = path.join(currPath,file);
    fsp.copyFile(currentPath , destinationPath);
   }
}
async function clear(){
    console.log('clear is working')
    const fileListSecond = await fsp.readdir(destPath);
    for(const file of fileListSecond) {
        const result = path.join(destPath, file);
       fsp.unlink(result);
    }
}


const execute = async () => {
    try {
        await clear();
    } catch {
        await fsp.mkdir(destPath , { recursive: true });
    } finally {
         await copyFiles();
    }
}

execute();
