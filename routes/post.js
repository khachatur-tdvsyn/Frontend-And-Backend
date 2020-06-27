const router = require('express').Router()  
const checkToken = require('./checkToken')
const Post = require('../model/post')
const jwt = require("jsonwebtoken")

router.get('/', checkToken, async (req,res)=>{
    const posts = await Post.find()
    res.send(posts);
})

router.get('/post/:id', checkToken, async (req,res)=>{
    const post = await Post.findOne({_id: req.params.id})
    if(!post){
        res.status(404).send("No posts found!")
    }
    res.send(post)
})

router.post('/add',checkToken, async(req,res)=>{
    const post = new Post({
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        userId: req.user
    })

    try {
        const data = await post.save()
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send('Please try again')
    }
})

router.post('/del/:id', checkToken, async (req,res)=>{
    const token = jwt.verify(req.header('auth-token'), 'tumo_students')
    const delPost = await Post.findById(req.params.id)
    if(delPost.userId == token.id){
        delPost.deleteOne()
        res.send("The post was deleted successfully!")
    }
    else{
        res.status(400).send("You have not access to other post")
    }
})

router.get('/user/:userId',checkToken, async (req,res)=>{
    const posts = await Post.find({userId: req.params.userId})
    res.send(posts)
})

module.exports  = router