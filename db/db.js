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

async function addUser(data) {
  const c = await Comment({ name: data.name, comments: data.comments });
  c.save()
    .then((r, e) => console.log(r))
    .catch((err) => console.log(err));
}

async function getUser(name) {
  await Comment.find({ name })
    .then((r) => {
      console.log(r);
      return r;
    })
    .catch((err) => console.error(err));
}

async function putComment(data) {
  
}

module.exports = { putComment, getUser, addUser , Comment};
