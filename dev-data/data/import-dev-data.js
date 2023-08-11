const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/toursModel')
const app = require('./../../app');




dotenv.config({ path: './config.env' });

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



//Read JSon file
const tours= JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));


//import data into database
const importData = async ()=>{
    try{
     await Tour.create(tours);
     console.log('data suceesful impported');
     process.exit()
    }catch(err){
        console.log(err);

    }
}


//delete all data from databse

const deleteData = async ()=>{
    try{
    await Tour.deleteMany()
     console.log('data suceesful deleted');
          process.exit();

    }catch(err){
        console.log(err);

    }
}


if(process.argv[2] === '--import'){
    importData();

}
else if (process.argv[2] === '--delete'){
deleteData();


} console.log(process.argv);

