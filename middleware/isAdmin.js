const isAdmin=(req,res,next)=>{
    if(req.user.role==="admin"){
        next()
    }
    else{
        res.status(401).json({message:"You are unauthorized for this activity"});
    }
}
module.exports=isAdmin