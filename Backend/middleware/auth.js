import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export const createToken = (email, password) => {
    return jwt.sign({email, password}, process.env.secretKey, {expiresIn: '1h'})
}

export const verifyToken = async(req, res, next) => {

    const token = req.cookies.token
    try {
        const decode = jwt.verify(token, process.env.secretKey)
        console.log("decode",decode);       
        req.currentUser = decode
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong in verify Token function"})       
    }
}

