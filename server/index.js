const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/router');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});