const express = require('express');
const Users = require('./../model/user.model');
const {list,createNew,read,update,remove} = require ('./user.controller');

const userRouter = express.Router();
//list and create methods
userRouter.route('/')
.get( async(req, res) => {
    // res.status(200).json({"message": "working"})
    try{
       
        const users= await list()
        if(users === null)
        {
            res.status(404).json({error: "no user in the list"})
        }
        res.status(200).json(users);
    }
    catch(err)
    {
        res.status(400).json({error: err.message})
    } 
})
.post(async(req, res)=> {
    
    try{
        const user= await createNew(req.body)
        res.status(200).json(user)
    }
    catch(err)
    {
        res.status(400).json({error: err.message})  
    }
  });


//read,update and delete methods
userRouter.route('/:userId')
.get(async(req, res) =>{
   const {userId} = req.params;
   try{
    const user = await read(userId)
    if(user === null)
    {
        res.status(404).json({error: "no such user found"}) 
    }
    res.status(200).json(user)
   }
   catch(err)
   {
    res.status(400).json({error: err.message})
   }
  })
.put(async(req, res) =>{
   try
   {
        const updated= await update(req)
        res.status(200).json(updated)
   }
   catch(err)
   {
    res.status(400).json({error: err.message})
   }
  })
.delete(async(req, res) =>{
    const {userId} = req.params
    try{
        const removed = await remove(userId)
        res.status(200).json(removed)
    }
    catch(err)
    {
        res.status(400).json({error: err.message})
    }  
  })


module.exports = userRouter;
