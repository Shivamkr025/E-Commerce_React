import { User } from "../model/userSchema.js";
import { createToken } from "../middleware/auth.js";
import bcrypt from 'bcrypt';

const saltRounds = 10; 

export const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await User.findOne({ email });        
        if (userData) {
            return res.status(401).json({ message: "User already registered." });
        }

        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const newUser = new User({...req.body, password: hashedPassword});

        await newUser.save();
        res.status(201).json({ message: "User registered successfully.", user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went worng in Register function" });
    }
};

export const loginUser = async(req, res) => {
    const {email, password} = req.body
    try {
        const userInfo = await User.findOne({email})
        if (!userInfo) {
            return res.status(401).json({message: "Please Register Your Account..."})
        }
        const isPassword = bcrypt.compareSync(password, userInfo.password)
        if (isPassword) {
            const token = createToken(email, password)
            res.cookie('token', token)
            res.status(200).json({message: "Login successfully..."})
        }else{
            return res.status(401).json({message:"Incorrect Password ..."})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went worng in Login function" });
    }
}

export const viewUser = async(req, res) => {
    try {
        const getDetails = await User.find({})
        if(!getDetails){
            return res.status(401).json({message: "Please login your account.."})
        }
        res.status(200).json({Details: getDetails})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error in view user function..."})
        
    }
}

export const updateDetails = async(req, res) => {
    const {email, password} = req.body
    try {
        const updateDetails = await User.findOne({email})
        if (!updateDetails) {
            return res.status(400).json({message: "Please Signup Your Account..."})
        }
        if (req.currentUser.email === updateDetails.email) {
            const hashedPassword = bcrypt.hashSync(password, saltRounds)
            const submitData = {...req.body, password:hashedPassword}
            const isUpdate = await User.findOneAndUpdate({email}, {$set: submitData}, {new: true})
            res.status(200).json({message: "Successfully Update User Account", UpdateUser: isUpdate})
        }else{
            return res.status(401).json({message: "Please login your account..."})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error in update user function"})
    }
}

export const deleteAccount = async(req, res) => {
    const {email} = req.body
    try {
        const deleteUser = await User.findOne({email})
        if (deleteUser.email === req.currentUser.email) {
            await User.findOneAndDelete({email})
            res.status(200).json({message:"Account delete successfully"})
        }else{
            return res.status(401).json({message: "Unauthorized. You can only delete your own account."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong in delete function" });
    }
}

export const logoutUser = async (req, res) => {
    try {
        // Clear the cookie storing the token
        res.clearCookie('token');
        res.status(200).json({ message: "User logged out successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong in logout function." });
    }
};
