const router = require('express').Router()  
const User = require('../model/user')
jwt = require('jsonwebtoken');

router.post('/signin', async(req,res)=>{
    const emailExists = await User.findOne({email: req.body.email})
    if (!emailExists) {
        res.status(400).send('Please register')
        return
    }
    if(req.body.password != emailExists.password){
        res.status(400).send('Password is wrong')
        return
    }
    const token = jwt.sign({ id: emailExists._id }, 'tumo_students');
    res.send({"auth-token": token})
})

router.post('/signup',async (req,res)=>{
    const emailExists = await User.findOne({email: req.body.email}) 
    if (emailExists) {
        res.status(400).send('Email already exists')
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const data = await user.save()
        console.log(data);
        res.send(data)
    } catch (error) {
      console.log(error);   
    } 
})

module.exports  = router


