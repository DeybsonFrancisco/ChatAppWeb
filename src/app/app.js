const path = require('path');
const http = require('http');
const socket = require('socket.io');

class App {
  constructor({ express, templateEngine, routes }) {
    this.server = express();
    this._middlewares(express);
    this._views(templateEngine);
    this._routes(routes);
    this.serverHttp = http.createServer(this.server);
  }

  initialize() {
    return this.serverHttp.listen(process.env.PORT || 3000, () =>
      console.log('start in port: 3000')
    );
  }

  _middlewares(express) {
    this.server.use(express.json());
  }
  _routes(routes) {
    this.server.use(routes);
  }
  _views(templateEngine) {
    this.server.set('views', path.join(__dirname, 'views'));
    this.server.engine('handlebars', templateEngine());
    this.server.set('view engine', 'handlebars');
  }
}
module.exports = App;
