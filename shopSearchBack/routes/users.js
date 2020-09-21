const { json } = require('express');
var express = require('express');
var mongoose = require('mongoose');
const { User } = require('../models/models');
var router = express.Router();
let dburl = 'mongodb+srv://mongoadmin:mongo_8906@cluster01.dkkku.mongodb.net/icecream?retryWrites=true&w=majority'
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});

/* GET users listing. */
router.get('/list', function(req, res, next) {
  const user = User;
  user.find().then(result => {
    res.send(result)
  }).catch(err => {
    throw new Error(err)
  })
});

router.post('/checklogin',function(req,res){
  let userData = req.body;

  const user = User;
  user.findOne({name:userData.userName, password:userData.credential,haslogin:true}).then((result) => {
    res.send(result)
  }).catch((er) => {
    throw new Error('insert operation failed!')
  });
})

router.post('/new',function(req,res){
  let userData = req.body;
  const user = new User({ 
    name: userData.name, phone: userData.phone, email: userData.email, haslogin:false
  });
  user.save().then(() => {
    res.send({msg:'Successfully inserted User'})
  }).catch((er) => {
    throw new Error('insert operation failed!')
  });
})

router.get('/delete/:id',function(req,res) {
  let id = req.params.id;
  const user = User;
  user.findByIdAndDelete(id).then(result => {
    res.send(result);
  }).catch(err => {throw new Error(err)})
})

router.get('/deleteall',function(req,res) {
  let id = req.params.id;
  const user = User;
  user.deleteMany({haslogin:false}).then(result => {
    res.send(result);
  }).catch(err => {throw new Error(err)})
})

module.exports = router;
