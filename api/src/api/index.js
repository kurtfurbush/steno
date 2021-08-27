
const router = require('express').Router(); 
const jobs =  require('./jobs.js');

router.get('/', (_, res) => {
  res.status(400);
  res.json({
    message: 'Try a supported route',
  });
});

router.use('/jobs', jobs);

module.exports = router;
