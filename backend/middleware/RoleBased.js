
const jwt=require('jsonwebtoken')

const RoleBaseVerify = (requiredRoles = []) => {
  return async (req, res, next) => {
      // getting token from cookie
   
    try {
         const token=req.cookies.token 

      if(!token)
     {
        return res.status(401).json({msg:'Access Denied due to not available of token'})
     } 
            // the token and secret=Pikachu should be match by both of them
            const verified=jwt.verify(token,'Pikachu')
            console.log(verified)
            // jo decoded data hai vo attach ho gya hai req.user taki vo agi ja ske
            req.user=verified
            console.log('Cookies:', req.cookies);
            console.log('Decoded User:', verified);
            
            // Checking the role is allowed or not
            if(!requiredRoles.includes(verified.userType))
            {
                return res.status(403).json({msg:'Role is not specified and role is not authorized'})
            }

            next()      //role is allowed in this
        } catch (error) {
            console.log(error)
            return res.status(401).json({msg:'Invalid Token You are not authorized'})
        }

  }
} 

module.exports={RoleBaseVerify}