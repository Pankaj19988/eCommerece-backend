const jwt = require('jsonwebtoken');
const JWT_SECRET = 'pankaj@$heer'

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token')

    if(!token){
       return res.stetus(401).send('please valid token')
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.mobileFind
        next();
    }
    catch(error){
        res.stetus(401).send('please valid token')
    }
}


module.exports = fetchuser