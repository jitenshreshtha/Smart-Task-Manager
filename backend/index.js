const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const bcrypt = require("bcryptjs");

//file imports
const User = require("./models/User");

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
