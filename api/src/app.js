const express =  require('express');
const { json } =  require('express');
const morgan =  require('morgan');
const helmet =  require('helmet');
const cors =  require('cors');
const { notFound, errorHandler } =  require('./middlewares.js');
const api =  require('./api/index.js');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(json());

app.get('/', (req, res) => {
  res.json({
    message: 'Nothing to see here'
  });
});

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
