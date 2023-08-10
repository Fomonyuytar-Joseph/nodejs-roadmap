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


exports.checkBody=(req,res,next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:"fail",
            message:"missing name or price"
        })

    }

    next();
}

exports.getAllTours = (req, res) => {

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        // results: tours.length,
        // data: {
        //     tours: tours,
        // },
    });
};

exports.getTour = (req, res) => {
    // console.log(req.params);

    const id = req.params.id * 1;

    // if (id > tours.length) {
    //     return res.status(404).json({
    //         status: 'failied',
    //         message: 'invalid ID',
    //     });
    // }

    // const tour = tours.find((el) => el.id === id);

    // res.status(200).json({
    //     status: 'success',

    //     data: {
    //         tour,
    //     },
    // });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

