const express = require('express');
const { Comment } = require('./db/db.js');
const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.listen(process.env.PORT || 8083, () => {
  console.log('listening on ' + (process.env.PORT ? process.env.PORT : 8083));
});

app.get('/comments/:name', async (req, res) => {
  try {
    console.log(req);
    const result = await Comment.findOne({ name: req.params.name });
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

app.get('/comments/all', async (req, res) => {
  try {
    const result = await Comment.find();
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

app.post('/save', async (req, res) => {
  console.log(req.body);
  await Comment.updateOne(
    { name: req.body.name },
    { comments: req.body.comments }
  )
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((err) => {
      res.status(404).send({ message: err.message });
    });
});

app.get('/', (req, res) => {
  res.send('vay amk');
});
