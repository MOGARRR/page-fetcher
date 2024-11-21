const needle = require('needle'); // imports needle
const fs = require('fs'); //imports file system
const args = process.argv; // takes arguments from command line and removes file paths from array
args.splice(0,2);

needle.get(`${args[0]}`, (error,response,body) => { // sends get request to url link
  if (error) {
    console.log(`${args[0]} is an invalid url. Please try again`); // return error message to user if url is invalid and ends function
    return; 
  }
  console.log('statusCode:', response && response.statusCode);
  fs.writeFile(args[1],body,error => { // creates and writes file to filepath given by user. Will add confirmation query in future commit
    error ? console.log('There was an error with file location:',error) : console.log(`Downloaded file and saved ${body.split('').length} bytes to ${args[1]}`);// returns error or sends string with confirmation of download and the file size.
    // size is caluculated by taking the file which is a string and spliting into an array. the length of that array is then returned since each character is equal to one byte 
  });
});

