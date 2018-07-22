var jwt = require('jsonwebtoken');

class verify {
    static verifyToken(req,res,next){
        const token = req.headers.token;
        if(typeof token !== undefined && token !== null) {
            jwt.verify(token, 'secret', function(err, decoded) {
                if(err){
                    console.log(err);
                }else{
                    if(decoded){
                        next();
                    }else{
                        res.status(500).json({
                            msg: "internal service err"
                        })
                    }
                }
              });
        }else{
            res.status(403).json({
                err: "you must be logged"
            })
        }
    }
}


module.exports = verify;





