const jwt = require("jsonwebtoken")
const verifyToken = (req,res,next) => {
    if(!req.headers.authorization){
        return res.status(401).send({message : "Unauthorized Access1"})
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token , process.env.SECRET , (err,decode) => {
        if(err){
            return res.status(401).send({message : "Unauthorized Access2"})
        }
        req.decode = decode;
        next();
    })
}
module.exports = verifyToken;