const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const views = require('koa-views');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');


const indexController = require('./src/controllers/index');
const openAIApiController = require('./src/controllers/openAIApi');

app.use(views(__dirname + '/src/views', {
  extension: 'html'
}));

app.use(cors());
app.use(bodyParser());
app.use(serve(__dirname + '/src/public'));

router.get('/', indexController.getIndex);
router.post('/api/createCompletion', openAIApiController.createCompletion);
router.post('/api/getModelsList', openAIApiController.getModelsList);

app.use(router.routes());

app.listen(3005, () => {
  console.log('Server listening on port 3005');
});

