//region Import libraries
const http = require('http');
//endregion

const port = 8080;

const requestHandler = (request, response) => {
  console.log(request.url);
  response.end('Hello world');
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
