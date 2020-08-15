
const{User,validateUser} = require('../models/user.js');
const express = require('express');
const bcrypt =  require('bcryptjs');
const  _ = require('lodash');

var router = express.Router();


router.get('/signup',(req,res,next)=>
{
  res.render('users/signup')
});

router.post('/signup',async(req,res,next)=>

{
  
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).render('users/signup',{title:'User already registered.'});
 
const { error } = validateUser(req.body); 
if (error){ 
  return res.render('users/signup',{title:error.message});
 
}

else {
    let user = new User(_.pick(req.body,['firstname','lastname','email','password']));
   bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(user.password, salt, async function(err, hash){
      if(err){
        console.log(err);
      }
      user.password = hash;
     await  user.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          const token = user.generateAuthToken();

          res.cookie('x-auth-token', token);
          res.redirect('/users/login');

        }
      });
    });
  });


}


});
router.get('/login',(req,res,next)=>
{
  res.render('users/signin');

});

router.post('/login',async(req,res,next)=>
{
  let user = await User.findOne({ email: req.body.email });
  if (!user) 
  {
    return res.status(400).render('users/signin',{title:'Invalid email or password'});
}

  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid){ return res.status(401).render('users/signin',{title:'Invalid email or passsword'});
  }
  if(isValid)
{
  const token = user.generateAuthToken();
  res.cookie(token);
  res.render('users/profile');
  console.log(token);
}
});
module.exports = router;



router.get('/profile',(req,res,next)=>
{
res.render()
});