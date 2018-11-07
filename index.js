/*
 * My api
 * 
 * Author: Mikhail Chuckov
 *
 */


// Dependencies
const http = require('http');
const url = require('url');

const port = 3000;

// Initiate the server
const server = http.createServer((req, res) => {
    // Parse url
    const parsedUrl = url.parse(req.url, true);
    const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

    // Choose handler if it is defined, if not choose notFound handler
    const handler = typeof(routes[trimmedPath]) !== 'undefined' ? routes[trimmedPath] : handlers.notFound;
    handler((statusCode, helloObject) => {
        const helloMessage = typeof(helloObject) === 'object' ? JSON.stringify(helloObject) : '';

        // Return response
        res.setHeader('content-type', 'application/json');
        res.writeHead(statusCode);
        res.end(helloMessage);;
    });

});


// Start the server
server.listen(port, function() {
    console.log('Server is listening on port: ' + port);
})

// Define handlers
const handlers = {
    hello: function(callback) {
        callback(200, { hello: 'pirple' });
    },
    notFound: function(callback) {
        callback(404);
    }
};

// Define a request router
const routes = {
    hello: handlers.hello
}