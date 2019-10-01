const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/',  (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use('/api/users', require('./api/users'))

app.listen(process.env.PORT || 8080, () => {
  console.log('listening on 8080')
});