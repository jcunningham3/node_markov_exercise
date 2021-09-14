const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require("./markov");

// create the machine and output text
function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

// read the file and print out the text if no errors
function cat(path){
  fs.readFile(path, 'utf8', function(err, data) {
    if(err) {
      console.error(`Error reading ${path}`);
      process.exit(1);
    }
    else {
      generateText(data);
    }
  });
}

// read the url and print it out if no errors
async function get_url(url) {
  let res;
  try {
    res = await axios.get(url);
    console.log(res.data);
  }
  catch {
    console.log(`Error getting ${url}`);
    process.exit(1);
  }
  generateText(res.data)
}

// look at the second argument
let path;
let out;

//distinguishing the process
if(process.argv[2] == '--out') {
  out = process.argv[3];
  path = process.argv[4];
}
else {
  path = process.argv[2];
}

// then looking at
if(path.slice(0,4) === 'http') {
  get_url(path, out);
}
else {
  cat(path, out);
}
