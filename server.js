const config = require('./config')
const restify = require('restify')
const fs = require('fs')

const server = restify.createServer({
  name: config.name,
	version: config.version,
	ignoreTrailingSlash: true
});

require('./src/routes/tasks')(server);

server.use(restify.plugins.bodyParser());

server.get('/status', (req, res, next) => {
  res.send({'status': 'ok'});
});

server.get('/', (req, res, next) => {
  const data = fs.readFileSync(__dirname + '/index.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});

server.listen(config.port, () => {
  console.log('%s listening at %s', server.name, server.url);
});