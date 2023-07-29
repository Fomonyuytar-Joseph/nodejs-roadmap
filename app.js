const fs = require('fs');
const express = require('express');
const morgan = require('morgan')

const app = express();

//middle wares
app.use(express.json());
app.use(morgan('dev'))

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();

})


const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


//route handlers

const getAllTours = (req, res) => {

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'failied',
      message: 'invalid ID',
    });
  }

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',

    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  //merge two existing objects together
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failied',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<update tour here ....>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failied',
      message: 'invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};


const getAllUsers =(req,res)=>{
  res.status(500).json({
    status:'error',
    message:"this route is under build"
  })
}
const getUser =(req,res)=>{
  res.status(500).json({
    status:'error',
    message:"this route is under build"
  })
}
const createUser =(req,res)=>{
  res.status(500).json({
    status:'error',
    message:"this route is under build"
  })
}
const updateUser =(req,res)=>{
  res.status(500).json({
    status:'error',
    message:"this route is under build"
  })
}
const deleteUser =(req,res)=>{
  res.status(500).json({
    status:'error',
    message:"this route is under build"
  })
}



//routes
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser)

const port = 8000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
