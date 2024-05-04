import express from 'express';
import { blogModel } from "../models/blogs.js";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images'); // Specify the destination directory for uploaded images
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const app = express();

app.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { username, title, content, timestamp } = req.body;
        let image = null;
        console.log(req.file);

        if (req.file) {
            image = req.file.filename; // Store the full path of the uploaded image
            console.log(image);
        }

        const newBlog = new blogModel({ username, title, content, timestamp, image });
        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully' });
    } catch (error) {
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
