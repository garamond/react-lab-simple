var Koa = require('koa');
var parse = require('co-body');
var jwtMiddleware = require('koa-jwt');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var cors = require('kcors');

var app = new Koa();
app.use(cors());
var publicKey = fs.readFileSync('demo.rsa.pub');
var privateKey = fs.readFileSync('demo.rsa');

// Public endpoint to login.
app.use(function *(next) {
  if (this.url.match(/^\/login/)) {
    var claims = yield parse(this);
    var token = jwt.sign(claims, privateKey, { algorithm: 'RS256', expiresIn: '5s'});
    this.status = 200;
    this.body = {token: token};
  } else {
    yield next;
  }
});

// Everything behind this will be protected.
app.use(jwtMiddleware({
  secret: publicKey,
  algorithm: 'RS256',
}));

app.use(function *() {
  this.status = 200;
  this.body = 'You are logged in dude! Welcome!';
});

app.listen(8080);
