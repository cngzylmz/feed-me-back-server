const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://clgnhmsi:350462@feed.syhtsbl.mongodb.net/feed?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then((_) => {
    console.log('db bağlandı');
  })
  .catch((err) => console.error(err));

const rock = new mongoose.Schema({
  name: String,
  comments: Array,
});

const Comment = mongoose.model('comments', rock);

module.exports = { Comment };
