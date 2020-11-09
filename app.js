const express = require('express');
const path = require('path');
const config = require('config')
const app = express();
const mongoose = require('mongoose');


const PORT = config.get('port');
const APPNAME = config.get('appName');

app.use(express.json({ extended: true }))

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true");
  next();
})


if(process.env.NODE_ENV === 'production') {
  app.use('/' + APPNAME, express.static(path.join(__dirname, APPNAME, 'build')));

  app.get('/' + APPNAME, (req, res) => {
    res.sendFile(path.resolve(__dirname, APPNAME, 'build', 'index.html'));
  })
}


// app code
app.use('/api/' + APPNAME, require('./' + APPNAME + '/apis' ))

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {

    app.listen(PORT, () => {
      console.log(`The server is now running on port ${PORT}...`)
    });

  })
