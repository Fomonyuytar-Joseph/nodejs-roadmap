const fs = require('fs');
const Tour = require('./../models/toursModel');
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );


// exports.checkID =(req,res,next,val)=>{
//      if (req.params.id * 1 > tours.length) {
//        return res.status(404).json({
//          status: 'failied',
//          message: 'invalid ID',
//        });
//      }

//      next();

// }


// exports.checkBody=(req,res,next)=>{
//     if(!req.body.name || !req.body.price){
//         return res.status(400).json({
//             status:"fail",
//             message:"missing name or price"
//         })

//     }

//     next();
// }

exports.getAllTours = catchAsync(async (req, res,next) => {

    

    // try{
      //build query
      const queryObj = { ...req.query };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);

      // 2) Advanced filtering
      let queryStr = JSON.stringify(queryObj);

      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

      console.log(JSON.parse(queryStr));


    

      // { duration: { gte: '5' }, difficulty: 'easy' }
      let query = Tour.find( );


     

    


      //execute the query
      const tours = await query;

      //send query
      res.status(200).json({
        status: 'success',
        results: tours.length,
        // requestedAt: req.requestTime,
        data: {
          tours,
        },
      });
    // }catch(err){
    // res.status(404).json({
    //     status:"fail",
    //     message:'cannot get all tours'
    // })
    // }
});

exports.getTour = catchAsync(async (req, res,next) => {
  

    // try{
       const tour= await Tour.findById(req.params.id)
       if(!tour){
       return  next( new AppError('No tour with that id found',404))
       }

       res.status(200).json({
        status: 'success',
        data:{
            tour
        }
       })

    // }catch(err){

    //     res.status(404).json({
    //         status: 'fail',
    //         message:'tour not found'
    //     })

    // }
    
});




exports.createTour = catchAsync( async (req, res, next) => {

    //  const newTour = newTour({})

    //  newTour.save();

    // try{
          const newTour = await Tour.create(req.body);
          res.status(200).json({
            status: 'success',
            data: {
              tour: newTour,
            },
          });

    // }catch(err){

    //     res.status(400).json({
    //         status: 'fail',
    //         message:err
    //     })
    //     // console.log(err);
    // }


  



    

    // const newId = tours[tours.length - 1].id + 1;
    // //merge two existing objects together
    // const newTour = Object.assign({ id: newId }, req.body);

    // tours.push(newTour);

    // fs.writeFile(
    //     `${__dirname}/../dev-data/data/tours-simple.json`,
    //     JSON.stringify(tours),
    //     (err) => {
    //         res.status(201).json({
    //             status: 'success',
    //             data: {
    //                 tour: newTour,
    //             },
    //         });
    //     }
    // );
});

exports.updateTour = catchAsync(async (req, res , next) => {

    // try{
     const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
     })
     
     res.status(200).json({
        status: 'success',
        data:{
            tour
        }
     })
    // }catch(err){
    //       res.status(404).json({
    //         status: 'fail',
    //         message:'Invalid request'
    //     })

    // }
});

exports.deleteTour = catchAsync(async (req, res ,next) => {
    // try{
       const tour =  await  Tour.findByIdAndDelete(req.params.id);

          if (!tour) {
            return next(new AppError('No tour with that id found', 404));
          }
        res.status(204).json({
            status:"success",
             data:null
        })

    // }catch(err){
    //      res.status(400).json({
    //        status: 'fail',
    //        message: 'Invalid request',
    //      });

    // }
   

    // res.status(204).json({
    //     status: 'success',
    //     data: null,
    // });
});

