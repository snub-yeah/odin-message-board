const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/router');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.development.local' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.URL }));
app.use(router);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});