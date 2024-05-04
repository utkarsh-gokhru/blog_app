import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    username: {type:String, required:true},
    title: {type:String, required:true},
    content: {type:String, required:true},
    timestamp: {type:Date,required:true},
    image: {type:String,required: true}
})

export const blogModel = mongoose.model('Blogs',blogSchema);
