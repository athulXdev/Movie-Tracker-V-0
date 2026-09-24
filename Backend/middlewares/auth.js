const jwt = require('jsonwebtoken')

exports.userAuthintication = (req,res,next)=>{
    try {
        const {token} = req.cookies

        // console.log('userauthenication invoked',req.cookies);
        
        if(!token){
           return res.status(500).json({
                status : false,
                Message:"No token found"
            })
        }

        const authincatedUser = jwt.verify(token,process.env.JWT_SECREAT_KEY);

        req.user = {
            userId : authincatedUser.userId,
            userRole : authincatedUser.userRole
        }

        next()
    } catch (error) {
        res.status(500).json({
            status : false,
            message : error.message
        })
    }
}