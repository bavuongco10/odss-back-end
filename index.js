const path = require('path');
const {createTerminus} = require('@godaddy/terminus');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const http = require('http');

const feedRoutes = require('./routes/feed.js');
const authRoutes = require('./routes/auth.js');
const sourcesRoutes = require('./src/sources/sources.routes');
const resultsRoutes = require('./src/results/results.routes');
const hotelsRoutes = require('./src/hotels/hotels.routes');
const citiesRoutes = require('./src/cities/cities.routes');
const searchesRoutes = require('./src/searches/searches.routes');
const travelsRoutes = require('./src/travels/travels.routes');
const rankingsRoutes = require('./src/rankings/rankings.routes');

const app = express();
const server = http.createServer(app);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json()); // application/json
app.use(
  multer({storage: fileStorage, fileFilter: fileFilter}).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Accept, Content-Type'
  );
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/api', sourcesRoutes);
app.use('/api', resultsRoutes);
app.use('/api', hotelsRoutes);
app.use('/api', citiesRoutes);
app.use('/api', travelsRoutes);
app.use('/api', rankingsRoutes);
app.use('/api/search', searchesRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message: message, data: data});
});

function onSignal() {
  console.log('server is starting cleanup')
  // start cleanup of resource, like databases or file descriptors
}

async function onHealthCheck() {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
}

createTerminus(server, {
  signal: 'SIGINT',
  healthChecks: {'/healthcheck': onHealthCheck},
  onSignal
});

mongoose
  .connect(
    'mongodb+srv://user1:34ggGqEofC6xRclb@cluster0-lbv81.mongodb.net/odss?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(result => {
    server.listen(8080);
  })
  .catch(err => console.log(err));
