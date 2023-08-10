const fs = require('fs');
const Tour = require('./../models/toursModel');

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

exports.getAllTours = async (req, res) => {

    try{
        const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      // requestedAt: req.requestTime,
      data: {
        tours,
      },
    });}catch(err){
    res.status(404).json({
        status:"fail",
        message:'cannot get all tours'
    })
    }
};

exports.getTour = async (req, res) => {

    try{
       const tour= await Tour.findById(req.params.id)

       res.status(200).json({
        status: 'success',
        data:{
            tour
        }
       })

    }catch(err){

        res.status(404).json({
            status: 'fail',
            message:'tour not found'
        })

    }
    
};

exports.createTour = async (req, res) => {

    //  const newTour = newTour({})

    //  newTour.save();

    try{
          const newTour = await Tour.create(req.body);
          res.status(200).json({
            status: 'success',
            data: {
              tour: newTour,
            },
          });

    }catch(err){

        res.status(400).json({
            status: 'fail',
            message:'Invalid data'
        })
        // console.log(err);
    }


  



    

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
};

exports.updateTour = async (req, res) => {

    try{
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
    }catch(err){
          res.status(400).json({
            status: 'fail',
            message:'Invalid request'
        })

    }
    // if (req.params.id * 1 > tours.length) {
    //     return res.status(404).json({
    //         status: 'failied',
    //         message: 'invalid ID',
    //     });
    // }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<update tour here ....>',
        },
    });
};

exports.deleteTour = (req, res) => {
   

    res.status(204).json({
        status: 'success',
        data: null,
    });
};

