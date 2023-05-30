import jwt from 'jsonwebtoken'
import { SECRET_KEY, manager } from '../configure.js'

const CHECKTOKEN =(req,res,next) => {
    try {
        const {token}= req.cookies
        const {verify}=jwt
      const {admin}=verify(token,SECRET_KEY)  
    if( !(admin==manager.admin) ){
        throw new Error(`admin must be single`)
    }
    next()
    } catch (error) {
       next(error) 
    }
}
export default CHECKTOKEN