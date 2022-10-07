var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const { query } = require('express');

const prisma = new PrismaClient()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user', function(req, res, next) {
  let newUser = prisma.user.findUnique({
    where: {
      email: req.body.email
    },
  }).then( r => {
    res.send(r);
  })
});

router.get('/parcels', function(req, res, next) {
  let newUser = prisma.parcel.findMany().then( r => {
    res.send(r);
  })
});

router.get('/parcel/:id', function(req, res, next) {
  console.log(req.params.id)
  let newUser = prisma.parcel.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  }).then( r => {
    res.send(r);
  })
});

router.delete('/del_parcel/:id', function(req, res, next) {
  console.log(req.params.id)
  let newUser = prisma.parcel.delete({
    where: {
      id: parseInt(req.params.id),
    },
  }).then( r => {
    res.send('Parcel record deleted successfully...!');
  })
});


router.post('/create_user', function(req, res, next) {
  console.log(req.body)
  let newUser = prisma.user.create({
    data: req.body,
  }).then( r => {
    console.log(r)
  }).then(() => {
    let users = prisma.user.findMany();
  }).then(() => {
    res.send('User Created....');
  })
});

router.post('/parcel/create', function(req, res, next) {
  console.log(req.body);
  let newParcel = prisma.parcel.create({
    data: req.body
  }).then((r) => {
    console.log(r)
  }).then(() => {
    res.send('Parcel Created Successfully....!');
  })
});

router.put('/parcel/update', function(req, res, next) {
  console.log(req.body);
  let newParcel = prisma.parcel.update({
    where: {
      id: req.body.id,
    },
    data: req.body
  }).then((r) => {
    console.log(r)
  }).then(() => {
    res.send('Parcel Updated Successfully....!');
  })
});

module.exports = router;
