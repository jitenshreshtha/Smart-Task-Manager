const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const bcrypt = require("bcryptjs");

//file imports
const User = require("./models/User");
const Task = require("./models/Task");

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "your_secret_key",
  })
);

//db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

//routes
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await new User({ email, password: hashedPassword });
  const savedUser = await newUser.save();
  if (savedUser) {
    res.status(201).json({ message: "User registered successfully" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.user = user._id;
      res.status(200).json({ message: "User logged in successfully" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
});
app.post("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "User logged out successfully" });
  });
});
app.get("/current_user", async (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ loggedIn: true, userId: req.session.user });
  }
  res.json({ loggedIn: false });
});
app.post('/tasks',async(req,res)=>{
  const { title, description, dueDate, priority } = req.body;
  try {
    const newTask = new Task({
      user: req.session.user,
      title,
      description,
      dueDate,
      priority,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});
app.get('/tasks',async(req,res)=>{
  const tasks = await Task.find({user:req.session.user}).sort({createdAt: -1});
  res.status(200).json(tasks);
})

app.put('/tasks/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.delete("/tasks/:id",async(req,res)=>{
  const result = await Task.findOneAndDelete({_id:req.params.id});
  if(result){
    res.status(200).json({message:"Task deleted successfully"});
  }
})
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
