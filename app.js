const express = require('express');
const morgan = require('morgan');


const AppError= require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//middlewares
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
 app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

//routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


app.all('*',(req,res,next)=>{
  
    // const err = new Error(`cant find ${req.originalUrl}`);
    // err.status='fail';
    // err.statusCode=404;

    next(new AppError(`cant find ${req.originalUrl}`,404));
})


app.use(globalErrorHandler)

module.exports = app;
