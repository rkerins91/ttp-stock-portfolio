const express = require('express');
const path = require('path');
const app = express();
const db = require('./db/index')


const createApp = () => {

  app.use(express.static(path.join(__dirname, 'build')));

  app.use(express.json({ extended: false }))

  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../public', 'index.html'));
  // });
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-Form-token');
    next();
  })
  app.use('/api/users', require('./api/users'))
  app.use('/api/auth', require('./api/auth'))
  app.use('/api/transactions', require('./api/transactions'))
  app.use('/api/portfolio', require('./api/portfolio'))
  


}

const syncDb = () => db.sync()

const startListen = () => app.listen(process.env.PORT || 8080, () => {
  console.log('listening on 8080')
});

async function bootApp() {
  await syncDb()
  await createApp()
  await startListen()
}

if (require.main === module) {
  bootApp()
} else {
  createApp()
}

module.exports = app