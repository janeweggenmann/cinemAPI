//imports the http, url, and fs modules
const http = require("http"),
  url = require("url"),
  fs = require("fs");

//createServer function comes from importing the http module above
http
  .createServer((request, response) => {
    let addr = request.url,
      q = url.parse(addr, true),
      //empty filePath as placeholder, this will be filled with the if statement below
      filePath = "";

    //log recent requests to the server in log.txt file
    fs.appendFile(
      "log.txt",
      "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n",
      err => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added to log.");
        }
      }
    );

    //if pathname includes 'documentation', then builds the filePath to create a complete pathname
    if (q.pathname.includes("documentation")) {
      filePath = __dirname + "/documentation.html";
      //if user makes a request to a URL that doesn't exist, return to main page
    } else {
      filePath = "index.html";
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }

      //adds a header to the response, along with status code of 200 which means 'OK'
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end("Hello Node!\n");
    });

    //listens for a response on port 8080
  })
  .listen(8080);
console.log("My first Node test server is running on Port 8080.");
