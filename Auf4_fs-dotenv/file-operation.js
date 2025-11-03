const fs = require('fs');

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const filePath = process.env.FILE_PATH;

if (!filePath) {
    console.error('FILE_PATH is not defined in the environment variables.');
    process.exit(1);
}

const textToWrite = 'Hello, this is a test file created using dotenv configuration!';
// Function to write to a file
fs.writeFileSync(filePath, textToWrite, 'utf8'); 
console.log(`File written successfully to ${filePath}`);

// Function to read a file
const data = fs.readFileSync(filePath, 'utf8');

console.log(`\nFile read successfully from ${filePath}`);
console.log('File Content:');
console.log(data);
