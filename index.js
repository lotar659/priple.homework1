const http = require('http');
const url = require('url');

const port = 3000;
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const handler = typeof(routes[trimmedPath]) !== 'undefined' ? routes[trimmedPath] : handlers.notFound;
    handler((statusCode, helloObject) => {
        const helloMessage = typeof(helloObject) === 'object' ? JSON.stringify(helloObject) : '';
        res.setHeader('content-type', 'application/json');
        res.writeHead(statusCode);
        res.end(helloMessage);;
    });

});

server.listen(port, function() {
    console.log('Server is listening on port: ' + port);
})


const handlers = {
    hello: function(callback) {
        callback(200, { hello: 'pirple' });
    },
    notFound: function(callback) {
        callback(404);
    }
};

const routes = {
    hello: handlers.hello
}