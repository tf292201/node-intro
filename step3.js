const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, out){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            writeToFile(data, out);
        }
    });
}


async function webCat(url, out){
  try {
    let response = await axios.get(url);
    writeToFile(response.data, out);
  } catch (error) {
    console.error(`Error fetching ${url}: ${error}`);
    process.exit(1);
  }
}

function writeToFile(data, path){
  if (path === undefined){
    console.log(data);
  } else {  
    fs.writeFile(path, data, 'utf8', function(err){
      if(err){
        console.error(`Couldn't write ${path}: ${err}`);
        process.exit(1);
      }
    }); 
  }
}

let path = '';
let out = '';

if (process.argv[2] === '--out'){
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}



if (path.slice(0, 4) === 'http'){
  webCat(path, out);
} else {
  cat(path, out);
}
