const path = require('path');
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
app.use('/map', express.static(__dirname + '/uploads'));
app.post('/upload', upload.single('upload'), (req, res, next) => {
  const {
    filename,
    originalname,
  } = req.file;
  console.log('Uploaded File name :', filename);
  console.log('Uploaded Original File name :', originalname);

  const uploadedFullPath = path.join(__dirname, 'uploads', filename);

  // Send to render map
  const { render } = require('./mapRender');
  render(uploadedFullPath, path.basename(filename), (err) => {
    if (err) {
      console.log('Map render with error :', err);
    }

    console.log('Map Rendered.');
    // res.sendFile(__dirname + '/static/success.html');
    res.send(`<img src="/map/thumb_${path.basename(filename)}.jpg" />`);
  });
});

app.listen(8000, () => {
  console.log('Express server listening on port 8000');
});