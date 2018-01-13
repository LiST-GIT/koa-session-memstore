## koa session 内存存储

```
npm install koa-session-memstore
```

### Usage

```javascript

const Koa = require( 'koa2' );
const http = require( 'http' );
const session = require( 'koa-session' );
const MemStore = require( './koa-session-memstore' );

const server = http.createServer();
server.listen( 18001 );

const app = new Koa();
app.keys = [ 'sig key' ];
app.use( session( { key: 'session', maxAge: 604800000, store: new MemStore( server ) }, app ) );
app.use( ctx => {
	ctx.session.time = ctx.session.time || Date.now();
	ctx.body = ctx.session.time;
} );
server.on( 'request', app.callback() );

```