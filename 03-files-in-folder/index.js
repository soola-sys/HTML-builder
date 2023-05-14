const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true} , (error , dirlist) => {
    if(error){
        console.log(error);
    }
    else {
        dirlist.forEach((file) => {
            fs.stat(path.join(__dirname, 'secret-folder' , file.name) , (error , stats) => {
                if(error) {
                    console.log(error);
                }
                else {
                    if(stats.isFile()){
                        console.log(`${file.name.slice(0 , file.name.indexOf(path.extname(file.name)))} - ${path.extname(file.name).substring(1)}- ${stats.size / 2000}`);
                    }
                }
            })
        })
        //    console.log(`${fi}`);
    }
});