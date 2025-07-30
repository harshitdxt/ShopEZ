const jwt=require('jsonwebtoken')

const verifyToken=async(req,res,next)=>{
    // getting token from cookie
    const token=req.cookies.token

    if(!token)
    {
        return res.status(401).json({msg:'Access Denied due to not available of Token'})
    }
    try {
        // the token and secret Key=Pikachu should match
        const verified=jwt.verify(token,'Pikachu')
        console.log('This is verified',verified)
         // jo decoded data hai vo attach ho gya hai req.user taki vo agi ja ske
        req.user=verified
        console.log('Cookies:', req.cookies);
        console.log('Decoded User:', verified);
        next()
    } catch (error) {
        console.log('Thi Error of token',error.msg)
        return res.status(401).json({msg:'Invalid Token You are not authroized'})
    }
}

module.exports={verifyToken}