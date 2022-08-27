const {expressjwt} = require("express-jwt");


//protecting the unauthorized access to sign in and getting user info

const requireSignin = expressjwt({
    secret: process.env.SECRET_KEY,
    userProperty: 'auth',
    algorithms: ["HS256"]

})

//protecting against unauthorized access to delete and update the :userId

const hasAuthorization = (req,res,next)=>{
    //req.auth is created by the express JWT

    console.log(req.params.userId)
    console.log(req.auth)
    console.log(req.auth._id)
    const authorized =  req.params._id == req.auth._id;

    if(!authorized)
    {
        return res.status(401).json({error: `User  is not authorized for this operation`});
    }
    next()
}

module.exports = {requireSignin,hasAuthorization}