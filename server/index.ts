
import "reflect-metadata"; 
const { TypeormStore } = require("connect-typeorm");
const Express = require("express");
const ExpressSession = require("express-session");
const { createConnection } = require('typeorm');
const { Session } = require("./src/entity/Session.ts");

createConnection().then(async (connection) => {
  
  const app = Express();
  const port = 3000;

  const sessionRepository = connection.getRepository(Session);
  const session = ExpressSession({
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    store: new TypeormStore({
      cleanupLimit: 2,
      ttl: 86400,
    }).connect(sessionRepository),
    secret: "keyboard cat",
  });
  app.use(session);

  app.get('/', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
}).catch((error) => 
  console.log(error)
);