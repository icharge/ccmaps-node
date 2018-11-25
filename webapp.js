const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage,
});
const app = express();

app.use('/', express.static(__dirname + '/static'));
app.post('/upload', upload.single('upload'), (req, res, next) => {
  const {
    filename,
    originalname,
  } = req.file;
  console.log('File name :', filename);
  console.log('Original File name :', originalname);

  res.sendFile(__dirname + '/static/success.html');
});

app.listen(8000, () => {
  console.log('Express server listening on port 8000');
});