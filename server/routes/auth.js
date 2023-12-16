import express from 'express';
import bcrypt from 'bcrypt';
import { userModel } from '../models/users.js';

const app = express();

app.post("/signup", async (req, res) => {
    try {
        const credentials = req.body;
        const { username, email, password } = credentials;

        const user = await userModel.findOne({ username });
        const existingEmailUser = await userModel.findOne({ email });

        if (user) {
            return res.status(409).json({ message: 'Username is already taken' });
        }
        if (existingEmailUser) {
            return res.status(404).json({ message: 'Account already exists with the above email id' });
        } 

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, email, password: hashedPass });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/login', async (req,res) => {
    try{
        const {username, password} = req.body;
        console.log(username,password);
        const user = await userModel.findOne({username});
        if (user){
            const validPass = await bcrypt.compare(password,user.password);
            if (validPass){
                return res.status(200).json({message:"Login successfull"});
            }
            else{
                return res.status(401).json({message:"Invalid Password"});
            }
        }
        else{
            return res.status(404).json({message:"User not found"});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

export { app as userAuth };
