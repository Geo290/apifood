const {Router} = require('express');
const router = Router();

const User = require('../models/user.models.js');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js')
const verifyToken = require('./verifyToken.js')

router.post('/API/v1/register',  async (req, res, next)=>{
    const { username, email, password   } = req.body;
    const user = new User ({
        username,
        email,
        password
    });
    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60
    })

    res.json({auth: true, token})
})

router.get('/API/v1/profile', verifyToken, async (req, res, next)=>{
  const user = await User.findById(req.userId, {password : 0})
  if(!user){
    return res.status(404).send('No user found')
  }

  res.json(user);
})


router.post('/API/v1/login', async (req, res, next)=>{
  const {email, password} = req.body;  
  const user = await User.findOne({email:email});

  if(!user){
    return res.status(404).send("The email doesn't exists");
    
  }
    
    const ValidPass = await user.valitePassword(password)
    
    if(!ValidPass){
      return res.status(401).json({
        auth: false,
        token: null
      });
    }
   const token =  jwt.sign({id: user._id}, config.secret,{
      expiresIn: 60 * 60
    })

    res.json({
      auth: true,
      token
    })
  
})



module.exports = router;