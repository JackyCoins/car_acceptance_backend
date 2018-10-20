//region Import libraries
const Koa = require('koa');
//endregion

//region Create the app
const app = new Koa();
//endregion

app.use(async ctx => {
  ctx.body = 'Hello world';
});

app.listen(8080);

app.on('error', err => {
  console.error('server error', err);
});

console.log('The app is listening to port:8080');
