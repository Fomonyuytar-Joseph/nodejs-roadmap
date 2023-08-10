const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASE_LOCAL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>console.log("suceesful"))

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
