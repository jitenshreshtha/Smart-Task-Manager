const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:{type:String,required:true},
    description:String,
    dueDate:Date,
    priority:{type:String,enum:['low', 'medium', 'high'],default:'medium'},
    completed:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now},
});
module.exports = mongoose.model('Task', taskSchema);