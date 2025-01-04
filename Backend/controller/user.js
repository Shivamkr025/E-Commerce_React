import { User } from "../model/userSchema.js";

export const registerUser = async(req, res) => {
    const {email } = req.body;
    
    try {
        console.log(req.body);
        const userData = await User.findOne({email})
        if(userData){
            return res.status(401).json({message: "User already register his account..."})
        }
        const submit = new User(req.body)
        await submit.save()
        res.status(201).json({message: "successfully submit user data ", submit})

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "please check your register function... "})
    }
}
