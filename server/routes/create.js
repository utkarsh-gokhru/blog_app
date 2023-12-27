import express from 'express';
import { blogModel } from "../models/blogs.js";

const app = express();

app.post('/create', async (req,res) => {
    try{
        const blog_content = req.body;
        const {username, title, content, timestamp} = blog_content;
        const newBlog = new blogModel({username,title,content,timestamp});
        await newBlog.save();
        res.status(201).json({message:'Blog created successfully'});
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/get', async (req,res) => {
    try{
        const allBlogs = await blogModel.find();
        res.json(allBlogs);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

app.post('/myblogs', async(req,res) => {
    try{
        const {username} = req.body;
        const myblogs = await blogModel.find({username});
        res.json(myblogs);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

export {app as Blog};
