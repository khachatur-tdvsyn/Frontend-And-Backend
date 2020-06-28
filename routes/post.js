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
        imgUrls: req.body.imgUrls,
        userId: req.user,
        tag: req.body.tag
    })

    try {
        const data = await post.save()
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send('Please try again')
    }
})
router.get("/tag/:tag", async(req,res) => {
    const tags = req.params.tag.split("%20");
    const thePosts = []
    for(let i in tags){
        const posts = Post.find({tag: tags[i]})
        thePosts.push(posts);
    }
    res.send(thePosts);
})
router.delete('/del/:id', checkToken, async (req,res)=>{
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
    console.log(typeof req.params.userId)
    const posts = await Post.find({userId: req.params.userId})
    res.send(posts)
})
router.patch('/update/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const data = await Post.findByIdAndUpdate(id,{$set: {
            title: req.body.title,
            imageUrls: req.body.imageUrls,
        }})
        res.send(data)
    } catch (error) {
        res.status(400).send({message: "Plase try again"})
        console.log(error);
    }
})
module.exports = router