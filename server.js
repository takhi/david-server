const http = require('http');
const url = require('url');

const fs = require('fs');
const readline = require('readline');

const david = require('./engine');

const DICTIONARY_PATH = "./words.txt";

let dictionary = [];

function populateDictionary(path) {
    const rl = readline.createInterface({
        input: fs.createReadStream(path)
    });
    console.log('Populating dictionary');
    rl.on('line', (line) => {
        dictionary.push(line);
    });
    rl.on('close', () => {
        console.log('Dictionary populated');
        
        //Start server
        startServer();
    });
}

function startServer() {
    const PORT = 1000;
    // url: http://localhost:1000/solve?letters=abcdefghi
    const validURL = /^\/solve\?letters/; 
    
    const server = http.createServer((request, response) => {
        if (validURL.test(request.url)) {
            let urlInfo = url.parse(request.url, true);
            let letters = urlInfo.query.letters;
            let solutions = david(letters, dictionary);
            response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'});
            response.write(JSON.stringify(solutions));
        } else {
            response.statusCode = 400;
        }
        response.end();
    }).listen(PORT);
    console.log(`server up on port ${PORT}`);
}

populateDictionary(DICTIONARY_PATH);
