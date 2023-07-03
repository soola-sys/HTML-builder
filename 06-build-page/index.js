const path = require('path');
const fsp = require('fs').promises;
const componentsPath = path.join(__dirname,'components');
const currPathCss = path.join(__dirname,'styles');
const currPathAssets = path.join(__dirname,'assets');
const destProjectDist = path.join(__dirname,'project-dist');

async function findTagNames(){
    let newArr = []
    let templateHtml = await fsp.readFile(path.join(__dirname,'template.html') , 'utf-8');
    const components = await fsp.readdir(componentsPath);
    for(const file of components){
        let stats = await fsp.stat(componentsPath , file.name);
         if(stats.isDirectory() && path.extname(file) == '.html'){
            const fileContent = await fsp.readFile(path.join(componentsPath , file));
            const slicedTemplateName = file.slice(0 , file.indexOf(path.extname(file)));
            newArr.push(`{{${slicedTemplateName}}}`);
            templateHtml = templateHtml.replace(`{{${slicedTemplateName}}}` , fileContent.toString());
         }
    }
    await fsp.appendFile(path.join(__dirname,'project-dist' , 'index.html') , templateHtml);
}

async function readStyles(){
    const fileList = await fsp.readdir(currPathCss);
    for(const file of fileList){
        let stats = await fsp.stat(currPathCss , file);
        if(stats.isDirectory() && path.extname(file) == '.css'){
            const fileContent = await fsp.readFile(path.join(currPathCss , file));
            await fsp.appendFile(path.join(__dirname, 'project-dist' , 'style.css') , fileContent);
        }
    }
}

async function copyAssetsFile(){
    const fileList = await fsp.readdir(currPathAssets);
    for(const file of fileList){
     const destinationPath = path.join(destProjectDist, file);
     const currentPath = path.join(currPathAssets,file);
     fsp.copyFile(currentPath , destinationPath);
    }
}

async function clear(){
    console.log('clear is working')
    const fileListSecond = await fsp.readdir(destProjectDist);
    for(const file of fileListSecond) {
        const result = path.join(destProjectDist, file);
       fsp.unlink(result);
    }
}

const execute = async() => {
    try {
        await clear();
    } catch {
        await fsp.mkdir(path.join(__dirname,'project-dist') ,{recursive: true});
    } finally {
        await findTagNames();
        await readStyles();
        await copyAssetsFile();
    }
}
execute()