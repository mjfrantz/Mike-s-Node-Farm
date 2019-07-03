const fs = require('fs');
const http = require('http'); //Module gives us networking capabilities 
const url = require('url');

///////////////////////////
//FILES 

//Blocking, Synchronous 
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8'); //Read the data from the file and return it to us
// console.log(textIn);

// //This write's a new file the output.txt 
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`; //Inside the curly braces we can plug in any JS we want 
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

//Non-blocking Asynchronous (Mutliple Steps with callback functions)
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log(`Your file has been written!`);
//             })
//         });
//     });
// });
////////////////////////////
//SERVER
//we use the createserver we use a method on the object, this accepts a callback function, this callback gets the request and response variable. We want to send a response to the client with res.end. Each time a new request hits our server the callback will be called the callback function will have access to the  request object which holds all kind of stuff like request url. response object gives us alot of tools with dealing alot of response such as .end(method). Simplest way to send back a simple response. 
const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW');
    } else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>This page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
}); //will start listening to incoming request starting up the server. We can run a callback function that will run the server.

