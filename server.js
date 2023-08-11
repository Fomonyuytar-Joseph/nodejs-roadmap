const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('suceesful'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
