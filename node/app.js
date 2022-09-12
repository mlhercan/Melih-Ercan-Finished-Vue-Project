const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./model/blogs')
const UsersDB = require('./model/usersDB')
const app = express()
app.use(express.json());
var cors = require('cors');
const jwt = require("jsonwebtoken");
const jwtSecret = "jwtSecret1234567890";
const bcrypt = require("bcrypt");
const { render } = require('ejs')

app.use(cors())

const dbURL= 'mongodb+srv://melih:melih@cluster0.hnx2xy2.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (req, res) => { 
  console.log("Working")
  res.send('This is homepage. Use this directions to make some operations [/all , /create , /single , /update , /delete ] For example ---> http://localhost:3000/all')
})

app.post('/create', async(req, res) => { 
  try{
    const post = req.body
    const createdPost=await Blog.create(post)
    res.status(201).json(createdPost)
  } catch(err) {
      console.log("Creation failed!")
      console.log(err)
      }
  })

app.get('/all', (req, res) => { 
  Blog.find()                 
      .then((result) => {
        console.log("Showing all the data!") 
        res.send(result)
      })
      .catch((err) => {
        console.log("Cannot show all data!")
        console.log(err)
      })
})

app.get('/single/:id', async(req,res)=>{
  try{
    const {id} = req.params
    const post = await Blog.findById(id)

    if(!post)return 
    res.status(200).json(post)

  } catch(err){
      console.log(err)
  }
})

app.put('/update/:id', async (req,res)=>{
  try{
    const {id} = req.params
    const {first_name, last_name, email, phone} = req.body

    if(!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send('Post not found.')

    const updatedPost = {first_name, last_name,email,phone, _id:id}
    await Blog.findByIdAndUpdate(id,updatedPost,{new:true})
    res.json(updatedPost)
  } catch(err){
      console.log(err)
  }
})

app.delete('/delete/:id', async (req, res) => {
  try{
    const {id} = req.params
    const post = await Blog.findByIdAndRemove(id)
    res.json('Post deleted.')

  } catch(err){
      console.log(err)
  }
})

app.post('/register', async(req, res, next) => { 
  const UserNew=new UsersDB({
    e_mail:req.body.e_mail,
    user_name:req.body.user_name,
    pass_word:bcrypt.hashSync(req.body.pass_word,10)
  })
  UserNew.save(err=> {
    if(err){
      return res.status(400).json({
        title:'error',
        error: 'E-mail in use.'
      })
    }
    return res.status(200).json({
      title: 'Registration succesfull!'
    })
  })
})

app.post('/login', (req, res, next)=> {
  UsersDB.findOne({user_name:req.body.user_name}, (err,user)=>{
    if(err) return res.status(500).json({
      title:'server error',
      error:err
    })
    if (!user){
      return res.status(401).json({
        title:'user not found',
        error:'invalid credentials'
      })
    }
    if(!bcrypt.compareSync(req.body.pass_word,user.pass_word)){
      return res.status(401).json({
        title:'login failed',
        error:'invalid credentials'
      })
    }
    let token =jwt.sign({userID:user._id}, 'secretkey');
    return res.status(200).json({
      title:'login success',
      token:token
    })
  })
})

app.get('/user', (req,res,next)=>{
  let token= req.headers.token;
  jwt.verify(token,'secretkey',(err,decoded)=>{
    if(err) return res.status(401).json({
      title:'unauthorized'
    })
    UsersDB.findOne({_id: decoded.userID},(err,user)=>{
      if (err) return console.log(err)
      return res.status(200).json({
        title:'user grabbed',
        user:{
          user_name:user.user_name,
        }
      })
    })
  })
})


app.listen(3000)