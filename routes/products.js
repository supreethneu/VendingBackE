var express = require('express');
var router = express.Router();
var multer  = require('multer');
var Product = require('../models/Product.js');

// Save file to server storage
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

// get data by id
router.get('/:id', function(req, res, next) {
    Product.findById(req.params.id, function (err, gallery) {
        if (err) return next(err);
        res.json(gallery);
    });
});
  

//post products
router.post('/additem', upload.single('prodimage'), (req, res, next) => {
    const product = new Product({
      prodimage: 'http://localhost:5000/images/' + req.file.filename,
      prodname: req.body.prodname,
      prodcost: req.body.prodcost,
      prodinfo: req.body.prodinfo
    });
    product.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Product added successfully!",
        productCreated: {
          _id: result._id,
          prodname: result.prodname,
          prodimage: result.prodimage,
          prodcost: result.prodcost,
          prodinfo: result.prodinfo
        }
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
  })

module.exports = router;