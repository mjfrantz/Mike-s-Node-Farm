const fs = require("fs");
const http = require("http"); //Module gives us networking capabilities
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

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

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

//we use the createserver we use a method on the object, this accepts a callback function, this callback gets the request and response variable. We want to send a response to the client with res.end. Each time a new request hits our server the callback will be called the callback function will have access to the  request object which holds all kind of stuff like request url. response object gives us alot of tools with dealing alot of response such as .end(method). Simplest way to send back a simple response.
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    //Product Page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    //Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html"
    });
    res.end("<h1>This page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
}); //will start listening to incoming request starting up the server. We can run a callback function that will run the server.
