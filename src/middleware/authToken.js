const jwt = require("jsonwebtoken");

const jwtVerify = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        if(!token) {
            return res.status(400).json({message: "Provide token"});
        }
        const {data} = await jwt.verify(token, process.env.secretKey);
        req.userData = data[0]._id;
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = jwtVerify;