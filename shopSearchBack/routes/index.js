var express = require('express');
const yelp = require('yelp-fusion');
var router = express.Router();

const apiKey = 'Nn7Cm77Sh7lY0UrX5u0NsIjrqaZ05Ikma8rQGwElyv03b3DJV0OrJqHkV20PcglT8EgNpKGVcJdOv3t_9TXyz4PSg6uxF493PNMbFXh1v3Q5lidatWOU3ZrHAlhGX3Yx';
const searchRequest = {
  term:'icecream',
  location: 'alpharetta'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getBusinessList',function(req,res){
  const client = yelp.client(apiKey);
  client.search(searchRequest).then(response => {
    const prettyJson = JSON.stringify(response.jsonBody);
    console.log(prettyJson);
    res.send(prettyJson);
  }).catch(e => {
    throw new Error(e);
  });
})

router.get('/getBusinessReview/:id',function(req,res){
  const client = yelp.client(apiKey);
  let id = req.params.id;
  client.reviews(id).then(response => {
    const prettyJson = JSON.stringify(response.jsonBody);
    console.log(prettyJson);
    res.send(prettyJson);
  }).catch(e => {
    throw new Error(e);
  });
})

module.exports = router;
