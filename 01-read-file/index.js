const fs = require('fs');
const path = require('path');

 const stream = fs.createReadStream(path.join(__dirname , 'text.txt'));

stream.on('data' , (item)  => {
    console.log(item.toString());
});
stream.on('error' , (e) => console.log(e));
